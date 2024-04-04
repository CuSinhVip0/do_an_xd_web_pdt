export const handleHideShowNav = (event) => {
    event.stopPropagation()
    document.getElementById("nav").classList.toggle("hidden")
    console.log(
        document
            .getElementById("container")
            .classList.replace(
                document.getElementById("container").classList[1],
                document.getElementById("container").classList[1] ==
                    "grid-cols-12"
                    ? "grid-cols-10"
                    : "grid-cols-12"
            )
    )
    document.getElementById("btn").classList.toggle("hidden")
}
