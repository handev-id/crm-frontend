import { GLOBAL_ICONS } from "../../utils/icons";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";

const Account = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6 w-full cn-box-base">
        <div className="h2 pb-3 border-b mb-6 border-base">Informasi Akun</div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            label="Nama Lengkap"
            sizing="sm"
            leftItem={GLOBAL_ICONS.user}
            placeholder="Nama Lengkap"
          />
          <Input
            label="Email"
            sizing="sm"
            leftItem={GLOBAL_ICONS.email}
            placeholder="Email"
          />
          <Input
            label="No Telepon"
            sizing="sm"
            leftItem={GLOBAL_ICONS.phone}
            placeholder="No Telepon"
          />
          <Input
            label="No Telepon"
            sizing="sm"
            leftItem={GLOBAL_ICONS.phone}
            placeholder="No Telepon"
          />
          <div className="lg:col-span-2 mt-4 flex justify-end">
            <Button>Simpan</Button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 space-y-6 w-full cn-box-base">
        <div className="h2 pb-3 border-b mb-6 border-base">Keamanan</div>
        <div className="grid gap-6">
          <Input
            type="password"
            label="Password Saat Ini"
            sizing="sm"
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Password Saat Ini"
          />
          <Input
            type="password"
            label="Password Baru"
            sizing="sm"
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Password Baru"
          />
          <Input
            type="password"
            label="Konfirmasi Password Baru"
            sizing="sm"
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Konfirmasi Password Baru"
          />
          <div className="mt-4 flex justify-end">
            <Button>Simpan</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
