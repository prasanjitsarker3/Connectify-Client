import useAuthUser from "@/components/Lib/authUser";
import { useAppSelector } from "@/components/Redux/hooks";
import { RootState } from "@/components/Redux/store";
import {
  useSendMessageDataMutation,
  useSendMessageWithImageMutation,
} from "@/components/RTKQuery/messageApi";
import { useSocket } from "@/components/SocketIO/socketProvider";
import { imgUrlCreate } from "@/components/UtlitiFunction/imageUpload";
import { Mic, Plus, Send, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type MessageFormInputs = {
  message: string;
};

const MessageAction = () => {
  const { socket } = useSocket();
  const { register, handleSubmit, reset, watch } = useForm<MessageFormInputs>();
  const currentUser = useAppSelector((state: RootState) => state.user);
  const user = useAuthUser();
  const [sendMessage] = useSendMessageDataMutation();
  const [sendMessageWithImage] = useSendMessageWithImageMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<MessageFormInputs> = async (data: any) => {
    if (!socket) {
      console.error("Socket is not connected");
      return;
    }
    const messageData = {
      message: data?.message,
      from: user.id,
      to: currentUser.id,
    };
    const res = await sendMessage(messageData);
    if (res?.data?.statusCode === 201) {
      reset();
    }
    socket.emit("send-msg", messageData);
  };

  // Handle image selection
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSendDB = async () => {
    if (!socket) {
      console.error("Socket is not connected");
      return;
    }
    if (!selectedImage) {
      return;
    }
    const imgUrl = await imgUrlCreate(selectedImage);
    const messageDataImage = {
      message: imgUrl,
      from: user.id,
      to: currentUser.id,
    };
    const res = await sendMessageWithImage(messageDataImage);
    if (res?.data?.statusCode === 201) {
      setSelectedImage(null);
      setImagePreview(null);
    }
    socket.emit("send-msg", messageDataImage);
  };

  return (
    <div className=" flex justify-between  items-center gap-5 px-4">
      {/* Image Select */}
      <div className="relative h-10 w-12 cursor-pointer bg-gray-200 rounded-full flex justify-center items-center">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={onImageChange}
        />
        <Plus className=" cursor-pointer" />
      </div>

      {selectedImage ? (
        <div className=" w-full bg-gray-100  flex justify-between items-center gap-2">
          <div className="  w-12 h-12">
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Selected"
                width={100}
                height={100}
                className=" h-12 w-24"
              />
            )}
          </div>
          <button
            onClick={handleImageSendDB}
            className="px-4 py-2 text-blue-500 rounded-md"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
          <input
            type="text"
            {...register("message")}
            placeholder="Send Message"
            className="py-3 pr-10 rounded-xl px-6 bg-gray-100 w-full focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <SendHorizontal size={20} />
          </button>
        </form>
      )}

      {/* Message Select */}

      <div className=" h-10 w-12 cursor-pointer bg-gray-200 rounded-full flex justify-center items-center">
        <Mic size={20} />
      </div>
    </div>
  );
};

export default MessageAction;
