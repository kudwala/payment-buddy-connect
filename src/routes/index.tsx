import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VariantA } from "@/components/payment-alerts/VariantA";
import { VariantB } from "@/components/payment-alerts/VariantB";
import { VariantCTopBar, VariantCModal } from "@/components/payment-alerts/VariantC";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pakt Payments — варианты баннера" },
      { name: "description", content: "Сравнение трёх вариантов уведомления о проблемах с SSL на странице оплаты." },
    ],
  }),
  component: Index,
});

type Variant = "A" | "B" | "C";

function MockPaymentPage({ variant }: { variant: Variant }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Имитация шапки сайта */}
      {variant === "C" && <VariantCTopBar />}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight text-slate-900">PAKT<span className="text-amber-500">.</span>payments</div>
          <div className="text-sm text-slate-500">Оплата заказа №A-10234</div>
        </div>
      </header>

      {/* Баннер */}
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}

      {/* Имитация формы оплаты */}
      <main className="px-6 py-8">
        <h1 className="text-xl font-semibold text-slate-900">Оплата заказа</h1>
        <p className="mt-1 text-sm text-slate-500">Сумма к оплате: <span className="font-semibold text-slate-900">12 480 ₽</span></p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-medium text-slate-900">Картой онлайн</div>
            <div className="mt-1 text-xs text-slate-500">Visa / Mastercard / МИР</div>
          </div>
          <div id="sbp" className="rounded-lg border-2 border-amber-400 bg-amber-50/50 p-4">
            <div className="text-sm font-medium text-slate-900">СБП (QR-код)</div>
            <div className="mt-1 text-xs text-slate-600">Рекомендуем при проблемах с оплатой</div>
          </div>
        </div>

        <button className="mt-6 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          Перейти к оплате
        </button>
      </main>
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<Variant>("A");

  const resetSession = () => {
    sessionStorage.removeItem("pakt_alert_a_dismissed");
    sessionStorage.removeItem("pakt_alert_b_dismissed");
    sessionStorage.removeItem("pakt_alert_c_modal_seen");
    location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {active === "C" && <VariantCModal key="modal" />}

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Варианты баннера для payments.pakt.ru
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Переключайтесь между вариантами и сравнивайте. Состояние «закрыт» хранится в sessionStorage.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(["A", "B", "C"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActive(v)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                active === v
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {v === "A" && "A — Мягкий info"}
              {v === "B" && "B — Красный alert + аккордеон"}
              {v === "C" && "C — Top-bar + модалка"}
            </button>
          ))}
          <button
            onClick={resetSession}
            className="ml-auto rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
          >
            Сбросить сессию (показать снова)
          </button>
        </div>

        <MockPaymentPage key={active} variant={active} />

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Подсказка</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><b>A</b> — амбер-баннер под шапкой, текст краткий + раскрывающиеся подробности, крестик скрывает на сессию.</li>
            <li><b>B</b> — красный alert с аккордеоном «Как решить», кнопки СБП и установки сертификата.</li>
            <li><b>C</b> — постоянная жёлтая полоска поверх шапки + модалка с полной инструкцией при первом заходе.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
