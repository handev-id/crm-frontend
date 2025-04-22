import { useForm } from "react-hook-form";
import { AiAgentModel } from "../../../apis/models/ai-agent";
import Button from "../../../components/button/Button";
import TextArea from "../../../components/form/TextArea";
import { useEffect, useState } from "react";
import Tab, { TabGroup } from "../../../components/Tab";
import { aiAgentTabs } from "../../../utils/constant/ai-agent";
import { GLOBAL_ICONS_FA } from "../../../utils/icons/fa";
import AiAgentEndpoint from "../../../apis/endpoints/ai-agent";
import toast from "react-hot-toast";
import { GLOBAL_ICONS } from "../../../utils/icons";

type Props = {
  aiAgentDetail: AiAgentModel;
  setAiAgentDetail: () => void;
};
const AiAgentDetail = ({ aiAgentDetail, setAiAgentDetail }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("general");

  const aiAgentApi = AiAgentEndpoint();

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AiAgentModel>();

  useEffect(() => {
    if (aiAgentDetail) {
      reset(aiAgentDetail);
    }
  }, [aiAgentDetail]);

  const handleUpdate = (data: AiAgentModel) => {
    toast
      .promise(aiAgentApi.update.mutateAsync(data), {
        loading: "Loading...",
        success: "Berhasil Mengupdate!",
        error: "Terjadi Kesalahan",
      })
      .then(() => {
        setAiAgentDetail();
      });
  };

  return (
    <>
      <div className="relative cn-box-base">
        <div className="absolute top-3 left-3">
          <button
            onClick={() => setAiAgentDetail()}
            className="text-2xl border border-base p-2 rounded-lg hover:bg-neutral dark:hover:bg-neutralHoverDark  Dark cursor-pointer"
          >
            {GLOBAL_ICONS.arrowBack}
          </button>
        </div>
        <div className="text-center box-header">
          <div className="flex gap-2 justify-center items-center">
            <span className="text-2xl">{GLOBAL_ICONS_FA.bot}</span>
            <h2 className="h1-lg"> {aiAgentDetail.name}</h2>
          </div>
          <p className="desc mt-1">
            Atur bagaimana Ai agent anda berinteraksi dengan pelanggan anda
          </p>
        </div>
        <div className="flex justify-between items-center">
          <TabGroup>
            {aiAgentTabs.map((tab) => (
              <Tab
                onClick={() => setActiveTab(tab.value)}
                isActive={activeTab === tab.value}
              >
                {tab.label}
              </Tab>
            ))}
          </TabGroup>
          <div></div>
        </div>
      </div>
      <div className="flex items-start mt-4 gap-4">
        <div className="cn-box-base w-full lg:w-[60%]">
          <p className="desc text-center my-4">
            Silakan tuliskan instruksi atau perintah yang ingin Anda berikan
            kepada AI, termasuk bagaimana gaya bicara atau cara penyampaiannya.
            Misalnya, apakah Anda ingin AI berbicara dengan gaya santai, formal,
            lucu, sopan, atau seperti seorang ahli di bidang tertentu. Semakin
            jelas instruksi yang Anda berikan, semakin sesuai pula respons yang
            akan diberikan oleh AI.
          </p>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="space-y-4 w-full"
          >
            <TextArea
              rows={20}
              label="Instruksi"
              placeholder="Tulis Instruksi Disini"
              {...register("instruction", { required: "Wajib Diisi" })}
              message={errors.instruction?.message}
              className="text-sm scrollbar"
            />
            <TextArea
              label="Pesan pertama yang akan dikirim AI kepada pelanggan"
              placeholder="Tulis Pesan Disini"
              {...register("welcomeMessage", { required: "Wajib Diisi" })}
              message={errors.welcomeMessage?.message}
              className="text-sm scrollbar"
            />
            <div className="flex flex-col items-end">
              <Button
                disabled={aiAgentApi.update.isPending}
                type="submit"
                className="ml-auto"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="cn-box-base w-full lg:w-[40%]">... Testing</div>
      </div>
    </>
  );
};

export default AiAgentDetail;
