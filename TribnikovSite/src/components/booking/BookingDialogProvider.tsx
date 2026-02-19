import * as React from "react";

import { BookingDialog } from "@/components/booking/BookingDialog";

type BookingDialogContextValue = {
  openBooking: () => void;
};

const BookingDialogContext = React.createContext<BookingDialogContextValue | null>(null);

export function BookingDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo<BookingDialogContextValue>(
    () => ({
      openBooking: () => setOpen(true),
    }),
    [],
  );

  return (
    <BookingDialogContext.Provider value={value}>
      {children}
      <BookingDialog open={open} onOpenChange={setOpen} />
    </BookingDialogContext.Provider>
  );
}

export function useBookingDialog() {
  const ctx = React.useContext(BookingDialogContext);
  if (!ctx) throw new Error("useBookingDialog must be used within <BookingDialogProvider />");
  return ctx;
}


