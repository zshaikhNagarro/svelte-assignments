<script lang="ts">
  export let label: string = 'Button';
</script>

<button class="ui-button">{label}</button>

<style>
  .ui-button {
    background: var(--color-theme-1, #ff3e00);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
