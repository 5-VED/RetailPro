import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const QrScannerModal = ({ isOpen, onClose, onScan, title = "Scan QR Code" }) => {

    // Prevent scanning immediately when opening if not intended, but usually intended.
    // We map the library's onScan result to our handler
    const handleScan = (detectedCodes) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const rawValue = detectedCodes[0].rawValue;
            console.log("Scanned:", rawValue);
            onScan(rawValue);
        }
    };

    const handleError = (error) => {
        console.error("QR Scan Error:", error);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-4 space-y-4">
                    <div className="w-full aspect-square max-w-[300px] overflow-hidden rounded-lg border bg-black">
                        {/* Only render scanner when open to save resources and permission requests */}
                        {isOpen && (
                            <Scanner
                                onScan={handleScan}
                                onError={handleError}
                                components={{
                                    audio: false,
                                    onOff: true,
                                    torch: true,
                                    zoom: false,
                                    finder: true,
                                }}
                                constraints={{
                                    facingMode: 'environment'
                                }}
                            />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                        Point your camera at a QR code
                    </p>
                    <Button variant="outline" className="w-full" onClick={onClose}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QrScannerModal;
