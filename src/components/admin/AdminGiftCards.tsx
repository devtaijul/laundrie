import { getAllGiftCardsAdmin, getGiftCardStatsAdmin } from "@/actions/gift-card.actions";
import { formatDate, formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Gift, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { CreateGiftCardModal } from "./CreateGiftCardModal";
import { GiftCardAdminActions } from "./GiftCardAdminActions";
import { GiftCardStatusFilter } from "./GiftCardStatusFilter";

interface Props {
  status?: string;
  page?: number;
}

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700 hover:bg-green-100",
  EXHAUSTED: "bg-gray-100 text-gray-500 hover:bg-gray-100",
  EXPIRED: "bg-orange-100 text-orange-600 hover:bg-orange-100",
  CANCELED: "bg-red-100 text-red-600 hover:bg-red-100",
};

export default async function AdminGiftCards({ status, page = 1 }: Props) {
  const [statsRes, cardsRes] = await Promise.all([
    getGiftCardStatsAdmin(),
    getAllGiftCardsAdmin({ status, page, limit: 20 }),
  ]);

  const stats = statsRes.success ? statsRes.data! : { total: 0, active: 0, exhausted: 0, canceled: 0, totalIssuedCents: 0, totalRedeemedCents: 0 };
  const cards = cardsRes.success ? (cardsRes.data ?? []) : [];
  const meta = cardsRes.meta;

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gift Cards</h1>
          <p className="text-sm text-muted-foreground">{stats.total} total cards issued</p>
        </div>
        <CreateGiftCardModal />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Gift className="h-5 w-5 text-primary" />}
          label="Total Issued"
          value={formatMoney(stats.totalIssuedCents, true)}
          sub={`${stats.total} cards`}
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          label="Active"
          value={String(stats.active)}
          sub="cards available"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
          label="Redeemed Value"
          value={formatMoney(stats.totalRedeemedCents, true)}
          sub="total spent"
        />
        <StatCard
          icon={<XCircle className="h-5 w-5 text-red-500" />}
          label="Canceled / Used"
          value={String(stats.canceled + stats.exhausted)}
          sub="inactive cards"
        />
      </div>

      {/* Filter */}
      <GiftCardStatusFilter currentStatus={status} />

      {/* Table */}
      {cards.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Gift className="h-10 w-10 text-muted-foreground/40" />
          <p className="font-semibold text-foreground">No gift cards found</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {["Code", "Amount", "Balance", "Recipient", "Status", "Issued", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cards.map((card) => (
                  <tr key={card.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold tracking-wider text-foreground">
                      {card.code}
                    </td>
                    <td className="px-4 py-3 text-foreground">{formatMoney(card.amountCents, true)}</td>
                    <td className="px-4 py-3">
                      <span className={card.balanceCents === 0 ? "text-muted-foreground" : "text-foreground font-medium"}>
                        {formatMoney(card.balanceCents, true)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">
                      {card.recipientEmail ?? (card.purchasedBy?.email ?? "—")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={cn("text-xs", STATUS_STYLE[card.status] ?? "bg-muted text-muted-foreground")}>
                        {card.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDate(card.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <GiftCardAdminActions id={card.id} status={card.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-mono font-semibold text-sm tracking-wider">{card.code}</p>
                  <Badge className={cn("text-xs shrink-0", STATUS_STYLE[card.status] ?? "bg-muted text-muted-foreground")}>
                    {card.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span>{formatMoney(card.amountCents, true)}</span>
                  <span className="text-muted-foreground">Balance</span>
                  <span>{formatMoney(card.balanceCents, true)}</span>
                  <span className="text-muted-foreground">Recipient</span>
                  <span className="truncate">{card.recipientEmail ?? "—"}</span>
                  <span className="text-muted-foreground">Issued</span>
                  <span>{formatDate(card.createdAt)}</span>
                </div>
                <GiftCardAdminActions id={card.id} status={card.status} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/admin/gift-cards?page=${p}${status ? `&status=${status}` : ""}`}
                  className={cn(
                    "h-9 w-9 flex items-center justify-center rounded-lg text-sm border transition-colors",
                    p === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted",
                  )}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
