'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './button';

const bannerVariants = cva(
	'relative overflow-hidden rounded-lg border shadow-lg text-xs',
	{
		variants: {
			variant: {
				default: 'bg-muted/40 border-muted/80',
				success:
					'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
				warning:
					'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100',
				info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
				premium:
					'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800 dark:text-purple-100',
				gradient:
					'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100',
				// Custom branded variant for founding partner
				branded:
					'bg-gradient-to-r from-blue-500/12 via-blue-500/8 to-blue-500/12 border-blue-500/25 text-white backdrop-blur-sm',
			},
			size: {
				default: 'py-2 px-3 md:px-4',
				sm: 'py-1.5 px-3 text-[11px]',
				lg: 'py-3.5 px-6 text-base',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type BannerProps = React.ComponentProps<'div'> &
	VariantProps<typeof bannerVariants> & {
		// Content
		title: string;
		description?: string;
		eyebrow?: string;

		// Icons and visuals
		icon?: React.ReactNode;
		showShade?: boolean;

		// Actions
		show?: boolean;
		onHide?: () => void;
		action?: React.ReactNode;
		closable?: boolean;

		// Behavior
		autoHide?: number; // milliseconds
	};

export function Banner({
	variant = 'default',
	size = 'default',
	title,
	description,
	eyebrow,
	icon,
	showShade = false,
	show,
	onHide,
	action,
	closable = false,
	className,
	autoHide,
	...props
}: BannerProps) {
	React.useEffect(() => {
		if (!autoHide) return undefined;

		const timer = setTimeout(() => {
			onHide?.();
		}, autoHide);

		return () => clearTimeout(timer);
	}, [autoHide, onHide]);

	if (!show) return null;

	return (
		<div
			className={cn(bannerVariants({ variant, size }), 'w-full max-w-2xl mx-auto', className)}
			role={variant === 'warning' || variant === 'default' ? 'alert' : 'status'}
			{...props}
		>
			{/* Shimmer effect */}
			{showShade && (
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
			)}

			<div className="flex w-full flex-wrap items-center gap-2 sm:flex-nowrap">
				<div className="flex min-w-0 flex-1 items-start gap-1.5 text-left sm:flex-none">
					{icon && <span className="flex-shrink-0 text-blue-200 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}

					<div className="min-w-0 flex-1 space-y-0.5">
						{eyebrow && <p className="text-[10px] uppercase tracking-[0.18em] text-blue-200/80">{eyebrow}</p>}
						<p className="font-semibold text-[13px] tracking-tight">{title}</p>
						{description && <p className="text-[11px] opacity-80 leading-snug">{description}</p>}
					</div>
				</div>

				<div className="flex items-center gap-2 sm:ml-auto">
					{action && <div className="flex items-center gap-2 pl-1">{action}</div>}
					{closable && (
						<Button
							onClick={onHide}
							size="sm"
							variant="ghost"
							className="h-6 w-6 rounded-full border border-white/15 p-0 text-[10px] text-white/70 hover:text-white"
						>
							<X className="h-3 w-3" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
