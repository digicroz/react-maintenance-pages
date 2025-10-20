import { cssContent } from "./cssContent"

let stylesInjected = false

export function injectStyles() {
  // Only inject once and only in browser environment
  if (stylesInjected || typeof document === "undefined") {
    return
  }

  // Check if styles already exist
  if (document.getElementById("rmp-maintenance-styles")) {
    stylesInjected = true
    return
  }

  // Create and inject style tag
  const styleTag = document.createElement("style")
  styleTag.id = "rmp-maintenance-styles"
  styleTag.textContent = cssContent
  document.head.appendChild(styleTag)

  stylesInjected = true
}
