import { QRCodeCanvas } from "qrcode.react";
import Button from "../../../components/button/Button";
import { useModal } from "../../../components/modal";
import Modal from "../../../components/modal/modal";
import { useEffect, useState } from "react";
import socket from "../../../apis/socket";
import WhatsappEndpoint from "../../../apis/endpoints/whatsapp";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { WaEvent } from "../../../types/wa-events";

const Whatsapp = () => {
  const whatsappApi = WhatsappEndpoint();

  const [event, setEvent] = useState<WaEvent["connection"]>({
    id: "",
    status: {
      connection: "CONNECTING",
      qr: undefined,
    },
  });
  const modalGuide = useModal({});
  const { profile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    socket.on("qrcode", (data) => {
      setEvent(data);
      console.log(data);
    });

    return () => {
      socket.off("qrcode");
    };
  }, [whatsappApi.getStatus.data]);

  useEffect(() => {
    if (profile?.id) {
      whatsappApi.getStatus.mutate(
        { id: profile.id },
        {
          onSuccess: (data) => {
            setEvent(data);
          },
        }
      );
    }
  }, [profile]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="h2 my-3">Scan Qrcode</div>
        <div className="m-4 w-[230px] h-[230px] flex justify-center items-center bg-neutral rounded-lg dark:bg-Dark">
          {event?.status.connection === "CONNECTED" ? (
            <div>Connect Success</div>
          ) : event?.status?.qr ? (
            <QRCodeCanvas size={200} value={event?.status?.qr || ""} />
          ) : (
            <div className="spinner"></div>
          )}
        </div>
        <div className="flex gap-3">
          <Button onClick={() => modalGuide.control.open()}>Panduan</Button>
          <Button
            coloring="danger"
            onClick={() => {
              whatsappApi.restart.mutate({ id: profile!.id });
            }}
          >
            Restart
          </Button>
        </div>
      </div>
      <Modal
        control={modalGuide.control}
        title="Panduan Scan Qrcode di Whatsapp"
      >
        <div className="text-left">
          <p className="text-gray-700 font-semibold mb-2">
            Petunjuk dengan QR Code
          </p>
          <ol className="list-decimal list-inside text-gray-600 mb-4">
            <li>Scan QR Code diatas melalui handphone Anda</li>
            <li>Kemudian Anda akan diarahkan ke aplikasi Whatsapp</li>
            <li>Kirimkan pesan yang sudah disiapkan tanpa mengubah apapun</li>
          </ol>
          <p className="text-gray-700 font-semibold mb-2">
            Petunjuk dengan Kirim Manual
          </p>
          <ol className="list-decimal list-inside text-gray-600 mb-4">
            <li>Salin kode login yang tersedia diatas</li>
            <li>Kemudian buka aplikasi Whatsapp Anda</li>
            <li>
              Tempelkan kode login diatas dan kirimkan ke nomor{" "}
              <strong>6285880255326</strong>
            </li>
          </ol>
        </div>
      </Modal>
    </>
  );
};

export default Whatsapp;
