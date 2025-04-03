import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn("up", 0.3)}
        className="w-full max-w-md mx-4"
      >
        <Card className="border-secondary border-opacity-20 bg-opacity-10 backdrop-blur-lg">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center">
              <AlertCircle className="h-8 w-8 text-secondary" />
              <h1 className="text-2xl font-bold text-white font-space">404 {t('notFound.title')}</h1>
            </div>

            <p className="mt-4 text-gray-300">
              {t('notFound.message')}
            </p>
            
            <div className="mt-6">
              <Link href="/">
                <Button className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('notFound.backHome')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
