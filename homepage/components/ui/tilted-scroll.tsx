import { cn } from "@/lib/utils"

interface TiltedScrollItem {
  id: string;
  text: string;
}

interface TiltedScrollProps {
  items?: TiltedScrollItem[];
  className?: string;
}

export function TiltedScroll({ items = defaultItems, className }: TiltedScrollProps) {
  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <div className="relative hidden w-full max-w-[300px] overflow-hidden md:block">
        <div className="grid h-[250px] w-full grid-cols-1 gap-5 animate-skew-scroll">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-2 cursor-pointer rounded-md p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-x-1 hover:-translate-y-1"
            >
              <CheckCircleIcon className="mr-2 h-6 w-6 stroke-white transition-colors group-hover:stroke-[color:var(--brand-pill-text,#BFDBFE)]" />
              <p className="text-white transition-colors group-hover:text-[color:var(--brand-pill-text,#BFDBFE)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.9) 0, rgba(0,0,0,0) 64px, rgba(0,0,0,0) calc(100% - 64px), rgba(0,0,0,0.9) 100%),' +
              'linear-gradient(to bottom, rgba(0,0,0,0.9) 0, rgba(0,0,0,0) 64px, rgba(0,0,0,0) calc(100% - 64px), rgba(0,0,0,0.9) 100%)',
          }}
        />
      </div>

      <div className="flex w-full max-w-[360px] flex-col gap-3 md:hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3"
          >
            <CheckCircleIcon className="h-5 w-5 stroke-white" />
            <p className="text-left text-sm text-white">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

const defaultItems: TiltedScrollItem[] = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
  { id: "5", text: "Item 5" },
  { id: "6", text: "Item 6" },
  { id: "7", text: "Item 7" },
  { id: "8", text: "Item 8" },
]
