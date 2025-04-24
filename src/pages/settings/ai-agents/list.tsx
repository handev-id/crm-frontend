import { Controller, useForm } from "react-hook-form";
import { Modal, useModal } from "../../../components/modal";
import { GLOBAL_ICONS } from "../../../utils/icons";
import { AiAgentModel } from "../../../apis/models/ai-agent";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { channelsMap } from "../../../utils/constant";
import { confirmAlert } from "../../../utils/confirmAlert";
import { GLOBAL_ICONS_FA } from "../../../utils/icons/fa";
import { useState } from "react";
import Actions from "../../../components/Actions";
import Input from "../../../components/form/Input";
import MultiSelect from "../../../components/form/MultiSelectInput";
import AiAgentEndpoint from "../../../apis/endpoints/ai-agent";
import Skeleton from "react-loading-skeleton";
import AiAgentDetail from "./detail";
import Toogle from "../../../components/button/Toogle";

const AiAgentList = () => {
  const { channels } = useSelector((state: RootState) => state.channels);
  const [aiAgentDetail, setAiAgentDetail] = useState<AiAgentModel | null>(null);
  const composeModal = useModal({});

  const aiAgentApi = AiAgentEndpoint();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
  } = useForm<AiAgentModel>({
    defaultValues: {
      status: "active",
    },
  });

  const handleUpsert = async (data: AiAgentModel) => {
    const newAi = await aiAgentApi.create.mutateAsync(data);
    composeModal.control.close();
    setAiAgentDetail(newAi);
  };

  const handleDelete = (id: number) => {
    confirmAlert({
      title: "Yakin?",
      message: "Anda akan menghapus Ai Agent Ini?",
      onConfirm: async () => {
        await aiAgentApi.destroy.mutateAsync({ id });
        await aiAgentApi.index.refetch({});
      },
    });
  };

  console.log(watch());

  return (
    <>
      {aiAgentDetail ? (
        <AiAgentDetail
          afterUpdate={async () => {
            setAiAgentDetail(null);
            await aiAgentApi.index.refetch();
          }}
          aiAgentDetail={aiAgentDetail}
        />
      ) : (
        <div className="cn-box-base">
          <div className="text-center box-header">
            <h2 className="h1-lg">Ai Agent</h2>
            <p className="desc mt-1">
              Ini adalah halaman di mana Anda dapat mengunjungi AI yang telah
              Anda buat sebelumnya. Jangan ragu untuk membuat perubahan dan
              membuat chatbot sebanyak yang Anda inginkan kapan saja!
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-2">
            {!aiAgentApi.index.data?.length && aiAgentApi.index.isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton style={{ borderRadius: "12px" }} height={"10rem"} />
                ))
              : aiAgentApi.index.data?.map((ai) => (
                  <div
                    onClick={() => setAiAgentDetail(ai)}
                    className="rounded-xl cursor-pointer border border-primary/50 flex flex-col justify-center items-center bg-primary/10 hover:bg-primary/20 h-40 shadow-lg hover:shadow duration-300"
                  >
                    <h2 className="h3 font-medium mb-2 text-primary">
                      {ai.name}
                    </h2>
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary text-white text-2xl">
                      {GLOBAL_ICONS_FA.bot}
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(ai.id);
                        }}
                        className="py-1 relative z-10 px-4 border border-red-500 hover:text-white hover:bg-red-500 text-red-500 rounded-md text-xs font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
            <div
              onClick={() => composeModal.control.open()}
              className="rounded-xl cursor-pointer border-base flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-300 h-40 shadow-lg hover:shadow duration-300"
            >
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white text-blue-500 text-2xl">
                {GLOBAL_ICONS.plus}
              </div>
              <h2 className="h2 mt-2 text-white">Buat Baru</h2>
            </div>
          </div>
        </div>
      )}

      <Modal title="Buat Ai Agent Baru" control={composeModal.control}>
        <form onSubmit={handleSubmit(handleUpsert)} className="space-y-4">
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
                label="Tugaskan Pada Channel, (Bisa Lebih Dari 1)"
                value={(value as unknown as string[]) || []}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (opt) => opt.value
                  );
                  onChange(selectedValues);
                }}
                options={(channels || []).map((channel) => {
                  return {
                    label: channel.name,
                    value: `${channel.id}`,
                  };
                })}
                message={errors.channelIds?.message}
                position="bottom"
                leftItems={Object.entries(channelsMap).map(
                  ([_, item]) => item.icon
                )}
                isDefault
              />
            )}
          />
          <p className="text-sm opacity-60">
            Ai agent akan membalas pesan yang berasal dari channel yang anda set
            diatas
          </p>
          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <Toogle
                label="Status"
                value={value === "active" ? true : false}
                onChange={() => {
                  onChange(value === "active" ? "inactive" : "active");
                }}
              />
            )}
          />
          <Actions
            error={aiAgentApi.create.error}
            loading={aiAgentApi.create.isPending}
          />
        </form>
      </Modal>
    </>
  );
};

export default AiAgentList;
