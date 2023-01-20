
document.addEventListener("keydown", (e) => {
    /** ======================================= **\
     *                KEY MAPPINGS                *
     *  =======================================   *
     *  ctrl + b                = bold letters    *
     *  ctrl + shift + p        = present         *
     *                                            *
     *                                            *
     *                                            *
    \*                                            */


    // TODO make shortcuts for IOS
    // if (process.platform == 'darwin') {



    //     return
    // }


    //TODO shortcut for save function
    if (e.ctrlKey && e.key == "s") {
        console.log("Trying to save o/")
    }

    //TODO shortcut for presenting a powerpoint
    if (e.ctrlKey && e.altKey && e.key == "p") {
        console.log("Trying to present :thumbsup:")
    }

})