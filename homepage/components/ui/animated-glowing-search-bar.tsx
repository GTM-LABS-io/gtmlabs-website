import React from 'react';

type SearchComponentProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const SearchComponent = ({ 
  value, 
  onChange,
  onKeyDown,
  placeholder = "Search...",
  className = ""
}: SearchComponentProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute z-[-1] w-full h-min-screen"></div>
      <div id="poda" className="relative flex items-center justify-center group">
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[52px] max-w-[260px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#020617,#1264a3_10%,#020617_38%,#020617_52%,#1e40af_70%,#020617_90%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[50px] max-w-[258px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(2,6,23,0),#1e3a8a,rgba(2,6,23,0)_12%,rgba(2,6,23,0)_52%,#2563eb,rgba(2,6,23,0)_68%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[50px] max-w-[256px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(2,6,23,0),#1d4ed8,rgba(2,6,23,0)_12%,rgba(2,6,23,0)_50%,#38bdf8,rgba(2,6,23,0)_68%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[48px] max-w-[254px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(2,6,23,0),#1e3a8a,rgba(2,6,23,0)_10%,rgba(2,6,23,0)_48%,#0ea5e9,rgba(2,6,23,0)_64%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[46px] max-w-[252px] rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(2,6,23,0)_0%,#60a5fa,rgba(2,6,23,0)_8%,rgba(2,6,23,0)_50%,#38bdf8,rgba(2,6,23,0)_58%)] before:brightness-125
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[44px] max-w-[248px] rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#020617,#0ea5e9_12%,#020617_24%,#020617_52%,#38bdf8_68%,#020617_80%)] before:brightness-125
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div id="main" className="relative group">
          <input 
            placeholder={placeholder}
            type="text" 
            name="text" 
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="bg-[#020617] border border-white/10 w-[248px] h-10 rounded-lg text-white px-[48px] text-sm focus:outline-none placeholder-slate-400 focus:border-white/30 transition"
          />
          <div className="absolute h-[30px] w-[30px] overflow-hidden top-[5px] right-[6px] rounded-lg
                          before:absolute before:content-[''] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-90
                          before:bg-[conic-gradient(rgba(2,6,23,0),#1e40af,rgba(2,6,23,0)_50%,rgba(2,6,23,0)_50%,#38bdf8,rgba(2,6,23,0)_100%)]
                          before:brightness-135 before:animate-spin-slow">
          </div>
          <div id="filter-icon" className="absolute top-[7px] right-[8px] flex items-center justify-center z-[2] h-5 w-5 [isolation:isolate] overflow-hidden rounded-md bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0f172a] border border-transparent">
            <svg preserveAspectRatio="none" height="18" width="18" viewBox="4.8 4.56 14.832 15.408" fill="none">
              <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#cbd5f5" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div id="search-icon" className="absolute left-3 top-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" height="18" fill="none" className="feather feather-search">
              <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
              <line stroke="url(#searchl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stopColor="#93c5fd" offset="0%"></stop>
                  <stop stopColor="#1e3a8a" offset="50%"></stop>
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stopColor="#bfdbfe" offset="0%"></stop>
                  <stop stopColor="#1e3a8a" offset="50%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
