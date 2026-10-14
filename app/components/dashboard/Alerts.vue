<template>
  <ul class="alerts">
    <div>
      <UiIcon icon="attention" style="color: var(--alert-color)" />
      <h4>Action Required</h4>
    </div>
    <li data-count="3">
      <span>Test message</span>
      <button>Action Button</button>
    </li>
    <li data-count="5">
      <span>Test message</span>
      <button>Action Button</button>
    </li>
    <li data-count="2">
      <span>Test message</span>
      <button>Action Button</button>
    </li>
    <li data-count="1">
      <span>Test message</span>
      <button>Action Button</button>
    </li>
  </ul>
</template>

<style lang="scss">
.alerts {
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;  
  border-radius: .8rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
  }

  li {
    border-top: 1px solid var(--gray-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin: 0;
    padding: 1rem;
    font-size: .9rem;
    position: relative;
    padding-left: 3rem;

    &:before {
      content: attr(data-count);
      display: inline-block;
      position: absolute;
      background: color-mix(in srgb, var(--danger-color) 10%, transparent);
      color: var(--danger-color);
      border-radius: .4rem;
      width: 1.5rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      font-size: 0.8rem;
      left: 1rem;
    }
  }
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    border-radius: 100vw;
    color: var(--gray-600);
    border: 1px solid currentColor;
    &:hover {
      color: var(--primary-color);
    }

  }
}
</style>