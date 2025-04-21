import { ChangeEvent, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import ChannelIntegrationsEndpoint from "../../../apis/endpoints/channel-integrations";
import toast from "react-hot-toast";

const Telegram = () => {
  const channelIntegrationsApi = ChannelIntegrationsEndpoint();

  const { register, handleSubmit, reset } = useForm<{ token: string }>();
  const onSubmit = (data: { token: string }) => {
    toast.promise(channelIntegrationsApi.telegram.mutateAsync(data), {
      loading: "Menghubungkan",
      success: "Berhasil menghubungkan",
      error: "Gagal menghubungkan",
    });
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col justify-end"
    >
      <Input
        label="Token"
        placeholder="Masukkan token yang berasal dari BotFather"
        className="w-full"
        {...register("token", { required: true })}
      />
      <Button
        type="submit"
        loading={channelIntegrationsApi.telegram.isPending}
        className="ml-auto"
      >
        Hubungkan
      </Button>
    </form>
  );
};

export default Telegram;
