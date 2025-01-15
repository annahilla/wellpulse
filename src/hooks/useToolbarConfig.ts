import { useState, useEffect } from "react";

const useToolbarConfig = () => {
    const getToolbarConfig = () => {
        if (window.innerWidth < 768) {
            return {
                left: "title prev,next",
                center: "timeGridDay",
                right: "",
                initialView: "timeGridDay"
            };
        } else if(window.innerWidth < 1300){
            return {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
                initialView: "timeGridWeek"
            };
        } else {
            return {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
                initialView: "dayGridMonth",
            };
        }
    };

    const [toolbarConfig, setToolbarConfig] = useState(getToolbarConfig());

    useEffect(() => {
        const handleResize = () => {
            setToolbarConfig(getToolbarConfig());
        };
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return toolbarConfig;
};

export default useToolbarConfig;
