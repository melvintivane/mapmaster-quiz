import { useCounterStore } from "@/stores/counter";
import { createPinia, setActivePinia } from "pinia";

const pinia = createPinia();
setActivePinia(pinia);

describe("useCounterStore", () => {
  it("increments the count", () => {
    const store = useCounterStore();
    store.increment();
    expect(store.count).toBe(1);
  });

  it("resets the count", () => {
    const store = useCounterStore();
    store.increment();
    store.reset();
    expect(store.count).toBe(0);
  });
});
