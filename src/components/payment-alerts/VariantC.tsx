import { useEffect, useState } from "react";
import { AlertTriangle, QrCode, X } from "lucide-react";

const MODAL_KEY = "pakt_alert_c_modal_seen";

export function VariantCTopBar() {
  return (
    <div className="bg-amber-400 text-amber-950">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium">
        <AlertTriangle size={14} />
        <span>
          ⚠️ Возможны проблемы с оплатой из-за отзыва сертификатов. Используйте СБП (оплата по QR-коду).
        </span>
      </div>
    </div>
  );
}

export function VariantCModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem(MODAL_KEY)) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    sessionStorage.setItem(MODAL_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={close}
          aria-label="Закрыть"
          className="absolute right-3 top-3 rounded p-1 text-slate-500 hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={22} />
          <h2 className="text-lg font-semibold text-slate-900">
            Уважаемые клиенты!
          </h2>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-slate-700">
          <p>
            В связи с отзывом SSL-сертификатов у ряда банков при переходе на
            платёжную страницу может появиться предупреждение о небезопасном
            соединении или белый экран.
          </p>
          <div>
            <p className="font-medium text-slate-900">Чтобы избежать проблем с оплатой:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>используйте браузеры, поддерживающие отечественные сертификаты;</li>
              <li>
                установите корневой сертификат Минцифры (
                <a
                  href="https://www.gosuslugi.ru/crt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  инструкция
                </a>
                );
              </li>
              <li>воспользуйтесь СБП — оплата по QR-коду.</li>
            </ul>
          </div>
          <p className="text-slate-500">Благодарим за понимание!</p>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            onClick={close}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Понятно
          </button>
          <a
            href="#sbp"
            onClick={close}
            className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            <QrCode size={16} /> Перейти к СБП
          </a>
        </div>
      </div>
    </div>
  );
}
