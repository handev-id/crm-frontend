import { useForm } from "react-hook-form";
import { AiAgentModel } from "../../../apis/models/ai-agent";
import Button from "../../../components/button/Button";
import Input from "../../../components/form/Input";
import TextArea from "../../../components/form/TextArea";
import { useEffect } from "react";
import Tab, { TabGroup } from "../../../components/Tab";

type Props = {
  aiAgentDetail: AiAgentModel;
};

const AiAgentDetail = ({ aiAgentDetail }: Props) => {
  const { reset } = useForm<AiAgentModel>();

  useEffect(() => {
    if (aiAgentDetail) {
      reset(aiAgentDetail);
    }
  }, [aiAgentDetail]);
  return (
    <>
      <div className="cn-box-base">
        <div className="text-center box-header">
          <h2 className="h1-lg">{aiAgentDetail.name}</h2>
          <p className="desc mt-1">
            Atur bagaimana Ai agent anda berinteraksi dengan pelanggan anda
          </p>
        </div>
        <div className="flex justify-between items-center">
          <TabGroup>
            <Tab>Umum</Tab>
            <Tab>Sumber Pengetahuan</Tab>
            <Tab>Follow Up</Tab>
          </TabGroup>
          <div></div>
        </div>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="cn-box-base w-full lg:w-[60%]">
          <div>Masukkan Prompt Ai</div>
          <form>
            <Input
              label="Pesan selamat datang"
              placeholder="Tulis Pesan Disini"
            />
            <TextArea label="Instruksi" placeholder="Tulis Instruksi Disini" />
            <Button>Submit</Button>
          </form>
        </div>
        <div className="cn-box-base w-full lg:w-[40%]">... Testing</div>
      </div>
    </>
  );
};

export default AiAgentDetail;
