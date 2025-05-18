import { GLOBAL_ICONS } from "../../../utils/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { Controller, useForm } from "react-hook-form";
import { AiAgentModel } from "../../../apis/models/ai-agent";
import { useEffect, useState } from "react";
import { aiAgentTabs } from "../../../utils/constant/ai-agent";
import { GLOBAL_ICONS_FA } from "../../../utils/icons/fa";
import Button from "../../../components/button/Button";
import TextArea from "../../../components/form/TextArea";
import Tab, { TabGroup } from "../../../components/Tab";
import AiAgentEndpoint from "../../../apis/endpoints/ai-agent";
import toast from "react-hot-toast";
import Input from "../../../components/form/Input";
import MultiSelect from "../../../components/form/MultiSelectInput";

type Props = {
  aiAgentDetail: AiAgentModel;
  afterUpdate: () => void;
};
const AiAgentDetail = ({ aiAgentDetail, afterUpdate }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const { channels } = useSelector((state: RootState) => state.channels);

  const aiAgentApi = AiAgentEndpoint();

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<AiAgentModel>();

  useEffect(() => {
    if (aiAgentDetail) {
      reset(aiAgentDetail);
    }
  }, [aiAgentDetail]);

  const handleUpdate = (data: AiAgentModel) => {
    toast.promise(
      aiAgentApi.update.mutateAsync(data, {
        onSuccess: () => {
          afterUpdate();
          reset();
        },
      }),
      {
        loading: "Loading...",
        success: "Berhasil Mengupdate!",
        error: "Terjadi Kesalahan",
      }
    );
  };

  return (
    <>
      <div id="ai-agent-detail" className="relative cn-box-base">
        <div className="absolute top-3 left-3">
          <button
            onClick={() => afterUpdate()}
            className="text-2xl border border-base p-2 rounded-lg hover:bg-neutral dark:hover:bg-neutralHoverDark  Dark cursor-pointer"
          >
            {GLOBAL_ICONS.arrowBack}
          </button>
        </div>
        <div className="text-center items-center box-header">
          <div className="flex gap-2 justify-center items-center">
            <span className="text-2xl">{GLOBAL_ICONS_FA.bot}</span>
            <h2 className="h1-lg"> {aiAgentDetail.name}</h2>
          </div>
          <p className="desc mt-1">
            Atur bagaimana Ai agent anda berinteraksi dengan pelanggan anda
          </p>
        </div>
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
      </div>
      <div className="flex items-start mt-4 gap-4">
        <div className="cn-box-base w-full lg:w-[60%] space-y-6">
          <Input
            label="Nama"
            leftItem={GLOBAL_ICONS.bot}
            placeholder="Masukkan Nama Ai"
            {...register("name", { required: "Wajib Diisi" })}
            message={errors.name?.message}
          />
          <Controller
            control={control}
            name="channelIds"
            rules={{ required: "Wajib Diisi" }}
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                label="Tugaskan Pada Channel (Bisa lebih dari 1)"
                options={(channels || []).map((channel) => {
                  return {
                    label: channel.name,
                    value: `${channel.id}`,
                  };
                })}
                value={(value as unknown as string[]) || []}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (opt) => opt.value
                  );
                  onChange(selectedValues);
                }}
                leftItems={channels?.map((channel) => (
                  <img
                    className="w-5 h-5 rounded-full object-cover"
                    src={channel?.logo?.url}
                  />
                ))}
                message={errors.channelIds?.message}
                position="bottom"
                isDefault
              />
            )}
          />
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
        <div className="cn-box-base w-full lg:w-[40%]">
          <TextArea
            rows={20}
            label="Sumber Pengetahuan"
            placeholder="Tulis Sumber Pengatahuan Untk Ai Anda Disini"
            {...register("knowlageResource")}
            className="text-sm scrollbar"
          />
        </div>
      </div>
    </>
  );
};

export default AiAgentDetail;
