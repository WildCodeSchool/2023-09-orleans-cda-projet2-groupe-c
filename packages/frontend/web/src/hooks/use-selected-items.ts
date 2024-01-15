import { useEffect, useState } from 'react';

import type { CategoryHobby, SelectedItemBody } from '@app/shared';

interface SelectionFormProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly apiUrlItems: string;
  readonly fieldNameItems: 'languages' | 'technologies' | 'hobbies';
}
export default function useSelectedItems({
  apiUrlItems,
  fieldNameItems,
}: SelectionFormProps) {
  const [items, setItems] = useState<CategoryHobby[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItemBody[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert Json to JS object
    const targetValue = JSON.parse(event.target.value);
    // Get Id from the value
    const targetId = targetValue.id;

    let newItems = selectedItems;
    //This function checks if the element is already in the array.
    //If so, it removes it.
    if (selectedItems.some((item) => item.id === targetId)) {
      newItems = selectedItems.filter((item) => item.id !== targetId);
    } else if (selectedItems.length < 6) {
      //Otherwise, it adds the item to the end.
      newItems = [
        ...selectedItems,
        { id: targetId, order: selectedItems.length + 1 },
      ];
    }
    setSelectedItems(newItems);
    //use localStorage.setItem method to store data in the user's browser's local storage.
    //and converted into a JSON string using JSON.stringify
    localStorage.setItem(fieldNameItems, JSON.stringify(newItems));
  };

  useEffect(() => {
    const savedItems = localStorage.getItem(fieldNameItems);
    if (savedItems !== null) {
      setSelectedItems(JSON.parse(savedItems));
    }
    const controller = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrlItems}`,
        {
          signal: controller.signal,
        },
      );

      const data = await response.json();
      setItems(data);
    })();

    return () => {
      controller.abort();
    };
  }, [apiUrlItems, fieldNameItems]);

  return {
    items,
    selectedItems,
    apiUrlItems,
    fieldNameItems,
    handleCheckboxChange,
  };
}
