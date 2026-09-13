export default function StaticImagePage({ src, alt }) {
  return (
    <div className="w-full h-full overflow-hidden rounded-[10px] bg-[#fdeef0] flex items-center justify-center">
      <img src={src} alt={alt} className="w-full h-full object-contain select-none" draggable={false} />
    </div>
  );
}
