"use client";

import { Footer } from "./footer";
import { Header } from "./header";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface PublicLayoutProps {
  title: string;
  description?: string;
}

const PublicLayout = ({
  title,
  description,
  children
}: React.PropsWithChildren<PublicLayoutProps>) => {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen w-full flex-col overflow-auto">
        <title>{`${title} | fairy-desk`}</title>
        {description && <meta name="description" content={description} />}
        <Header />
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-10 flex flex-1 items-center justify-between space-x-[10vw] px-4 pt-10"
        >
          <div className="w-full">{children}</div>
        </motion.div>
        <Footer />
      </div>
    </AuroraBackground>
  );
};

export default PublicLayout;