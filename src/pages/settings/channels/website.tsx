import gif from "../../../assets/images/chatbot-ai.gif";
import Button from "../../../components/button/Button";

const Website = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold leading-snug">
          Siapkan Widget Chatbot untuk Website-mu
        </h2>
        <p className="text-lg text-gray-700 dark:text-neutral">
          Mudahkan pengunjung website berkomunikasi langsung dengan chatbot
          cerdas yang siap menjawab pertanyaan mereka 24/7.
        </p>
        <p className="text-lg text-gray-700 dark:text-neutral">
          Integrasi cepat, tanpa ribet, dan cocok untuk semua jenis website!
        </p>
        <div className="w-[200px]">
          <Button sizing="fullSm">Siapkan Sekarang</Button>
        </div>
      </div>
      <div>
        <img
          className="w-full max-h-[400px] object-contain"
          src={gif}
          alt="Ilustrasi chatbot AI"
        />
      </div>
    </div>
  );
};

export default Website;
