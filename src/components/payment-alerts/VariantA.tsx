import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const KEY = "pakt_alert_a_dismissed";

export function VariantA() {
  const [open, setOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

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
    <div className="border-b border-amber-300 bg-amber-50 text-amber-900">
      <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 py-3">
        <AlertTriangle className="mt-0.5 shrink-0" size={20} />
        <div className="flex-1 text-sm leading-relaxed">
          <strong>Внимание!</strong> Из-за отзыва SSL-сертификатов у некоторых
          банков возможны проблемы с переходом на платёжную страницу. Если вы
          видите предупреждение о небезопасном соединении или белый экран,
          воспользуйтесь альтернативным способом оплаты — например, через СБП
          (QR-код).{" "}
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="font-medium underline underline-offset-2 hover:text-amber-700"
          >
            {showDetails ? "Скрыть" : "Подробнее"}
          </button>
          {showDetails && (
            <div className="mt-3 space-y-2 rounded-md bg-amber-100/60 p-3 text-amber-900">
              <p>Чтобы избежать проблем с оплатой:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>используйте браузеры, поддерживающие отечественные сертификаты;</li>
                <li>
                  установите корневой сертификат Минцифры (
                  <a
                    href="https://www.gosuslugi.ru/crt"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    инструкция
                  </a>
                  );
                </li>
                <li>воспользуйтесь СБП (оплата по QR-коду).</li>
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={dismiss}
          aria-label="Закрыть"
          className="shrink-0 rounded p-1 hover:bg-amber-100"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
