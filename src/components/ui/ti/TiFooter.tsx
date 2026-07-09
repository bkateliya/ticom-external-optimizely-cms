export function TiFooter() {
  // footer.js (loaded in <TiScripts /> from the root layout) owns this
  // container's innerHTML — it lazy-renders the footer via an IntersectionObserver.
  // dangerouslySetInnerHTML (empty) stops React from reconciling its subtree so it
  // doesn't wipe the injected markup; suppressHydrationWarning avoids a mismatch warning.
  return (
    <div
      id="tiFooter"

    />
  );
}
