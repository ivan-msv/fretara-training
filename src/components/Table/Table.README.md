# Table system

Source: [Figma Table System, 4604:1596](https://www.figma.com/design/8IMduhFcLt3Dbc9m7kkBJn/Fretara--training-?node-id=4604-1596).

Import from `src/components/Table`. `DataTable<T>` composes native table elements; use `TableContainer`, `Table`, `TableHeaderCell`, `TableRow` and `TableCell` directly for custom structures. Native attributes and refs are forwarded to their elements.

```tsx
const columns: TableColumn<Invoice>[] = [
  { id: 'invoice', header: 'Invoice', cell: row => <TableText secondary={row.description}>{row.id}</TableText> },
  { id: 'amount', header: 'Amount', align: 'right', sortable: true,
    cell: row => <TableCurrency symbol="€" amount={formatAmount(row.amount)} /> },
]

<DataTable
  label="Invoices"
  columns={columns}
  rows={pageRows}
  getRowId={row => row.id}
  sort={sort}
  onSortChange={setSort}
  selection={{ selectedIds, onChange: setSelectedIds, getLabel: row => row.id }}
  toolbar={<TableToolbar title="Invoices" search={{ value: query, onChange: e => setQuery(e.target.value) }} />}
  footer={<TableFooter page={page} pageSize={20} total={total} onPageChange={setPage} />}
/>
```

## Data and performance

- Supply unique, stable row and column IDs. Keep columns and callbacks stable when practical.
- Filtering, sorting and pagination are controlled by the application. `DataTable` renders the supplied rows without sorting, copying or slicing them. This supports local and server data without two competing state stores.
- Sort callbacks alternate ascending and descending. Apply the returned sort before passing rows back.
- Selection uses a `ReadonlySet<string>` and emits a new `Set`. Select-all affects only enabled rows on the current page, preserving selections on other pages. Remove stale IDs when records are deleted.
- Pass only the current page for large datasets. Virtualization is intentionally absent: it would complicate native table accessibility and is unnecessary for paginated data.
- Column widths accept CSS widths. Set a table `style={{ minWidth: 900 }}` when columns need a minimum readable width; the enclosing region scrolls horizontally and is keyboard focusable.
- Pass `loading` and disable application pagination while fetching. Loading renders five skeleton rows by default. Empty results render the Figma empty state; `emptyState` can replace it.
- `isRowDisabled` disables selection and marks the row disabled without hiding its data from assistive technology. Cell renderers receive `{ disabled }` as their second argument; pass it to custom controls and omit link destinations when disabled.
- Currency, percentage and date content accept display values. Localize and format values in the application. Set `dateTime` on `TableDate` when a machine-readable date is available.

## Composition

`TableToolbar` accepts a title or navigation, optional search props, and filter/action slots. Existing Dropdown and Button controls receive the Figma 32px toolbar sizing. Use existing Checkbox and StatusBadge directly in cells. `TableActions` is a labelled native button: connect an action or accessible menu in the application.

The content helpers cover text, two-line text, date, relative date, number, currency, percentage, icon/text, user, link, empty value, skeleton, rating and actions. Checkbox content reuses Checkbox.

## Figma discrepancies

- Several structural cells and loading rows have a 10px height despite larger children. The implementation preserves the specified padding (compact 6px/8px, default 10px/12px, comfortable 14px/12px) and allows content to determine the final height. Invoice rows retain the example's 64px content height.
- The invoice example displays six records while its footer says “1–10 of 248”. Stories use the actual count. Pagination shows a moving window of three page buttons with working previous/next boundaries.
- The example marks Amount ascending while its values are unsorted. The interactive story starts unsorted and sorts actual values when the header is activated.
- Existing StatusBadge assets are reused; no duplicate badge styles or tokens are introduced.
- Secondary text uses Figma's gray-400, whose contrast against white is below WCAG AA for small text. This existing design-system discrepancy is preserved for fidelity and needs a design decision before claiming full AA conformance.

## Verification

Storybook `Fretara/Table` includes the invoice example, density variants, loading, empty, disabled rows, pagination, tabbed toolbar, narrow layout, cell content and an interaction story for selection, disabled rows and sorting.
