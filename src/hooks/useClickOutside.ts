import { RefObject } from "@fullcalendar/core/preact.js";
import { useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, excludeRef: React.RefObject<HTMLElement> | null = null) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            ref.current &&
            !ref.current.contains(event.target as Node)&&
            (excludeRef?.current && !excludeRef.current.contains(event.target as Node))
          ) {
            callback();
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [callback]);
}

export default useClickOutside;