import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Book from "../components/book/Book";
import { useAppStore } from "../store/useAppStore";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

export default function BookPage() {
  const bookTargetPage = useAppStore((s) => s.bookTargetPage);
  const setBookTargetPage = useAppStore((s) => s.setBookTargetPage);
  const [opened, setOpened] = useState(bookTargetPage != null);
  const [target, setTarget] = useState(bookTargetPage ?? null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (bookTargetPage != null) {
      setOpened(true);
      setTarget(bookTargetPage);
      setBookTargetPage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      {!opened && (
        <div className="flex flex-col items-center pt-6">
          <p className="font-display text-3xl text-rose-700 mb-1">كتابي الخاص</p>
          <p className="text-ink-700/60 text-sm mb-6">اضغطي على الغلاف لتبدئي رحلتك ✨</p>
          <motion.button
            onClick={() => setOpened(true)}
            whileTap={{ scale: 0.96 }}
            className="relative"
          >
            <motion.img
              src="/book/cover.jpg"
              alt="افتحي كتابي"
              className="w-56 sm:w-72 rounded-xl book-shadow"
              animate={{ rotateZ: [0, -1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <span className="absolute inset-x-0 -bottom-9 text-center text-rose-600 font-bold text-sm animate-sparkle">
              اضغطي لفتح الكتاب ↓
            </span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full flex flex-col items-center -mx-4 sm:-mx-6 px-1 sm:px-4"
          >
            <Book targetIndex={target} isMobile={isMobile} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
