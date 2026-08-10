"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  title: string;
  price: number;
  currency?: string;
  imageUrl: string;
  imageAlt?: string;
  description?: string;
  badge?: string;
  actionLabel?: string;
  onAction?: () => void;
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  price,
  currency = "HUF",
  imageUrl,
  imageAlt,
  description,
  badge,
  actionLabel = "Részletek",
  onAction,
  editable = false,
  onEdit,
  className,
}: ProductCardProps) {
  void price;
  void currency;

  return (
    <Card
      className={cn(
        "overflow-hidden",
        onAction ? "cursor-pointer transition hover:border-brand/60" : null,
        className
      )}
      onClick={onAction}
      role={onAction ? "link" : undefined}
      tabIndex={onAction ? 0 : undefined}
      onKeyDown={
        onAction
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAction();
              }
            }
          : undefined
      }
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl && !imageUrl.includes("feltoltes-alatt") ? (
          <img
            src={imageUrl}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-xs text-muted-foreground">Feltöltés alatt</p>
          </div>
        )}
        {badge ? (
          <Badge className="absolute left-3 top-3" variant="secondary">
            {badge}
          </Badge>
        ) : null}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-base">{title}</CardTitle>
        {description ? (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="pb-3 pt-0">
        <p className="text-sm font-medium text-brand">Egyedi ajánlat alapján</p>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onAction?.();
          }}
          type="button"
        >
          {actionLabel}
        </Button>
        {editable ? (
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            type="button"
          >
            Szerkesztés
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
