function render(selector : string, content : string | HTMLElement): void {
  const element: HTMLElement | null = document.querySelector(selector);
  if (element) {
    typeof content == 'string' ?
      element.insertAdjacentHTML('beforeend', content) :
      element.appendChild(content)
  };
}

export default render;
