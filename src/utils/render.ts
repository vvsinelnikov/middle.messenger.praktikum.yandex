function render(selector : string, content : HTMLElement): HTMLElement | void {
  const element: HTMLElement | null = document.querySelector(selector);
  if (element) {
    return element.appendChild(content);
  }
}

export default render;
