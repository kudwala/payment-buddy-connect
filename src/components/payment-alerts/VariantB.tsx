import { useEffect, useState } from "react";
import { AlertTriangle, ChevronDown, X, QrCode, ShieldCheck } from "lucide-react";

const KEY = "pakt_alert_b_dismissed";

export function VariantB() {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(KEY)) {
      setOpen(false);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="border-b-2 border-red-600 bg-red-50 text-red-950">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={22} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                ⚠️ Возможны проблемы с оплатой из-за отзыва сертификатов. Используйте СБП (оплата по
                QR-коду).
              </p>
            </div>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-red-700 underline-offset-2 hover:underline"
            >
              Как решить
              <ChevronDown
                size={16}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <button
            onClick={dismiss}
            aria-label="Закрыть"
            className="shrink-0 rounded p-1 hover:bg-red-100"
          >
            <X size={18} />
          </button>
        </div>

        {expanded && (
          <div className="mt-3 ml-9 space-y-3 rounded-md border border-red-200 bg-white p-4 text-sm text-red-950">
            <p>
              В связи с отзывом SSL-сертификатов у ряда банков при переходе на платёжную страницу
              может появиться предупреждение о небезопасном соединении или белый экран.
            </p>
            <div>
              <p className="font-medium">Чтобы избежать проблем с оплатой:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>используйте браузеры, поддерживающие отечественные сертификаты;</li>
                <li>установите корневой сертификат Минцифры;</li>
                <li>воспользуйтесь СБП — оплата по QR-коду.</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#sbp"
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <QrCode size={16} /> Оплатить через СБП
              </a>
              <a
                href="https://www.gosuslugi.ru/crt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                <ShieldCheck size={16} /> Установить сертификат
              </a>
            </div>
            <p className="pt-1 text-xs text-red-800/80">Благодарим за понимание!</p>
          </div>
        )}
      </div>
    </div>
  );
}
