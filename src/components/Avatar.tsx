export default function Avatar({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="Avatar Caqap.id"
      className={`w-[41px] h-[41px] rounded-full object-cover`}
    />
  );
}
