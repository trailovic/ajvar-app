"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createRecipe,
  type CreateRecipeActionState,
} from "@/app/actions/create-recipe";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AddRecipeDialog() {
  const initialState: CreateRecipeActionState = {
    status: "idle",
  };

  const [state, formAction, pending] = useActionState(
    createRecipe,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        title="Add a recipe"
        aria-label="Add a recipe"
        className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#241814] transition-colors hover:border-[#a6291f]/30 hover:bg-[#fffaf2] hover:text-[#a6291f]"
      >
        <Plus
          className="size-5"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-[#241814]">
            Add a recipe
          </DialogTitle>

          <DialogDescription>
            Share something delicious with the Ajvar community.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipe-title">Title</Label>

            <Input
              id="recipe-title"
              name="title"
              placeholder="Pesto and tomato sandwich"
              maxLength={120}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipe-description">
              Description
            </Label>

            <Textarea
              id="recipe-description"
              name="description"
              placeholder="A quick lunch with fresh tomatoes, pesto and mozzarella."
              maxLength={500}
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="recipe-servings">
                Servings
              </Label>

              <Input
                id="recipe-servings"
                name="servings"
                type="number"
                min={1}
                step={1}
                defaultValue={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipe-prep">
                Prep minutes
              </Label>

              <Input
                id="recipe-prep"
                name="prepMinutes"
                type="number"
                min={0}
                step={1}
                defaultValue={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipe-cook">
                Cook minutes
              </Label>

              <Input
                id="recipe-cook"
                name="cookMinutes"
                type="number"
                min={0}
                step={1}
                defaultValue={0}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipe-ingredients">
              Ingredients
            </Label>

            <Textarea
              id="recipe-ingredients"
              name="ingredients"
              placeholder={`2 slices sourdough bread
2 tablespoons pesto
1 tomato
Fresh mozzarella`}
              rows={6}
              required
            />

            <p className="text-xs leading-5 text-black/50">
              Add one ingredient per line. We’ll introduce
              structured amounts and units in the full editor later.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipe-steps">
              Preparation
            </Label>

            <Textarea
              id="recipe-steps"
              name="steps"
              placeholder={`Spread pesto over the bread.
Add the sliced tomato and mozzarella.
Close the sandwich and serve.`}
              rows={6}
              required
            />

            <p className="text-xs leading-5 text-black/50">
              Add one preparation step per line.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipe-tags">Tags</Label>

            <Input
              id="recipe-tags"
              name="tags"
              placeholder="sandwich, lunch, vegetarian"
              required
            />

            <p className="text-xs leading-5 text-black/50">
              Separate multiple tags with commas.
            </p>
          </div>

          {state.message && (
            <div
              role={state.status === "error" ? "alert" : "status"}
              className={
                state.status === "success"
                  ? "rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
                  : "rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
              }
            >
              <p>{state.message}</p>

              {state.errors && (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {Object.values(state.errors)
                    .flatMap((errors) => errors ?? [])
                    .map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                </ul>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose
              disabled={pending}
              render={<Button type="button" variant="outline" />}
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={pending}
              className="bg-[#a6291f] text-white hover:bg-[#872219]"
            >
              {pending ? "Publishing..." : "Publish recipe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}