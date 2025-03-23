import { QRCodeCanvas } from "qrcode.react";
import Button from "../../../components/button/Button";
import { useModal } from "../../../components/modal";
import Modal from "../../../components/modal/modal";
import { useEffect } from "react";
import socket from "../../../apis/socket";

const Whatsapp = () => {
  const modalGuide = useModal({});

  useEffect(() => {
    socket.on('qrcode', (data) => {
      console.log(data)
    })

    return () => {
      socket.close()
    }
  },[])

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="h2 my-3">Scan Qrcode</div>
        <div className="m-4 bg-neutral p-4 rounded-lg dark:bg-Dark">
          <QRCodeCanvas size={200} value="https://reactjs.org/" />
        </div>
        <div className="flex gap-3">
          <Button onClick={() => modalGuide.control.open()}>Panduan</Button>
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
