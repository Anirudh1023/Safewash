"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Apple, PlayCircle, Smartphone } from "lucide-react";

interface InstallAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full border-2 border-[#0084b8]/30"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>

                    {/* Content */}
                    <div className="p-8">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#0084b8] to-[#65A006] rounded-3xl flex items-center justify-center shadow-lg">
                                <Smartphone className="h-10 w-10 text-white" />
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <span className="font-bold text-3xl text-[#0084b8]">SAFE</span>
                                <span className="font-bold text-3xl text-[#65A006]">WASH</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                Download Our App
                            </h2>
                            <p className="text-gray-600">
                                To schedule a pickup, please install our mobile app from your preferred store
                            </p>
                        </div>

                        {/* App Store Buttons */}
                        <div className="space-y-3">
                            {/* Play Store */}
                            <motion.a
                                href="https://play.google.com/store/apps/details?id=com.anirudh1023.Safewash&pcampaignid=web_share"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#0084b8] to-[#0084b8]/80 text-white font-semibold hover:shadow-lg hover:shadow-[#0084b8]/30 transition-all duration-300"
                            >
                                <PlayCircle size={24} />
                                <div className="text-left">
                                    <div className="text-xs opacity-90">GET IT ON</div>
                                    <div className="text-lg font-bold">Google Play</div>
                                </div>
                            </motion.a>

                            {/* App Store */}
                            <motion.a
                                href="https://apps.apple.com/in/app/safewash-drycleaners-hyd/id6742979933"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#65A006] to-[#65A006]/80 text-white font-semibold hover:shadow-lg hover:shadow-[#65A006]/30 transition-all duration-300"
                            >
                                <Apple size={24} />
                                <div className="text-left">
                                    <div className="text-xs opacity-90">DOWNLOAD ON THE</div>
                                    <div className="text-lg font-bold">App Store</div>
                                </div>
                            </motion.a>
                        </div>

                        {/* Footer Note */}
                        <p className="text-center text-sm text-gray-500 mt-6">
                            Available for iOS and Android devices
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
