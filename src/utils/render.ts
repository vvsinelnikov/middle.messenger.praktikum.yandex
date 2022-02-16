function render(selector : string, content : HTMLElement): void {
  const element: HTMLElement | null = document.querySelector(selector);
  if (element) {
    element.appendChild(content);
  }
}

export default render;
