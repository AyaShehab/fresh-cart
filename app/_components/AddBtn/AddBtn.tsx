'use client'

import React, { ReactNode } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart } from '@/Api/Actions/cartActions/addToCart'
import { toast } from '@/components/ui/toast'

export default function AddBtn({
  cls,
  child,
  prodId,
}: {
  cls: string
  child: ReactNode
  prodId: string
}) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.add({
        type: 'success',
        description: data.message,
        priority: 'high',
      })
      queryClient.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({
        type: 'error',
        description: 'Login First',
        priority: 'high',
      })
    },
  })

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    mutate(prodId)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
      className={cls}
    >
      {child}
    </button>
  )
}