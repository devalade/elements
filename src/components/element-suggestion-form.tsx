"use client";

import { useId, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { ChevronDownIcon } from "@/components/icons/chevron-down";
import { GroupIcon } from "@/components/icons/group";
import { TriggerIcon } from "@/components/icons/trigger";
import { UploadThingIcon } from "@/components/icons/upload-thing";
import { PixelatedCheckIcon } from "@/components/pixelated-check-icon";
import { PixelatedSharpCornerIcon } from "@/components/pixelated-sharp-corner-icon";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BetterAuthIcon } from "@/components/ui/logos/better-auth";
import { PolarIcon } from "@/components/ui/logos/polar";
import { ResendIcon } from "@/components/ui/logos/resend";
import { StripeIcon } from "@/components/ui/logos/stripe";
import { SupabaseIcon } from "@/components/ui/logos/supabase";
import { UpstashIcon } from "@/components/ui/logos/upstash";
import { VercelIcon } from "@/components/ui/logos/vercel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

export function ElementSuggestionForm() {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [customProvider, setCustomProvider] = useState<string>("");
  const [_elementName, setElementName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const providers = [
    {
      value: "vercel",
      label: "Vercel AI SDK",
      icon: VercelIcon,
      category: "AI",
    },
    {
      value: "trigger",
      label: "Trigger.dev",
      icon: TriggerIcon,
      category: "Jobs",
    },
    {
      value: "upstash",
      label: "Upstash",
      icon: UpstashIcon,
      category: "Database",
    },
    {
      value: "uploadthing",
      label: "UploadThing",
      icon: UploadThingIcon,
      category: "Files",
    },
    {
      value: "supabase",
      label: "Supabase",
      icon: SupabaseIcon,
      category: "Database",
    },
    {
      value: "polar",
      label: "Polar",
      icon: PolarIcon,
      category: "Monetization",
    },
    {
      value: "better-auth",
      label: "Better Auth",
      icon: BetterAuthIcon,
      category: "Auth",
    },
    { value: "resend", label: "Resend", icon: ResendIcon, category: "Email" },
    {
      value: "stripe",
      label: "Stripe",
      icon: StripeIcon,
      category: "Payments",
    },
    {
      value: "logos",
      label: "Brand Logos",
      icon: GroupIcon,
      category: "Branding",
    },
    {
      value: "unknown",
      label: "Other Provider",
      icon: PixelatedSharpCornerIcon,
      category: "Custom",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider || !description.trim()) return;

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  const resetForm = () => {
    setOpen(false);
    setSelectedProvider("");
    setCustomProvider("");
    setElementName("");
    setDescription("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card/30 backdrop-blur-sm border border-border border-dotted p-6 space-y-4"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <PixelatedCheckIcon className="w-8 h-8 text-green-500" />
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Thanks for the suggestion!
            </h3>
            <p className="text-sm text-muted-foreground">
              We'll review your element idea and get back to you soon.
            </p>
          </div>
          <Button
            onClick={resetForm}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Suggest Another Element
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card/30 backdrop-blur-sm border border-border border-dotted p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Suggest an Element
          </h3>
          <p className="text-xs text-muted-foreground">
            Missing a component? Let us know what you'd like to see!
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor={id} className="text-sm font-medium mb-2 block">
              Provider
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal"
                >
                  {selectedProvider ? (
                    <span className="flex min-w-0 items-center gap-2">
                      {(() => {
                        const selectedItem = providers.find(
                          (item) => item.value === selectedProvider,
                        );
                        if (selectedItem) {
                          const Icon = selectedItem.icon;
                          return (
                            <Icon className="text-muted-foreground size-4" />
                          );
                        }
                        return null;
                      })()}
                      <span className="truncate">
                        {
                          providers.find(
                            (item) => item.value === selectedProvider,
                          )?.label
                        }
                      </span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Select a provider...
                    </span>
                  )}
                  <ChevronDownIcon
                    className="opacity-50 text-muted-foreground/80 shrink-0"
                    aria-hidden="true"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Search providers..." />
                  <CommandList>
                    <CommandEmpty>No provider found.</CommandEmpty>
                    <CommandGroup>
                      {providers.map((provider) => (
                        <CommandItem
                          key={provider.value}
                          value={provider.value}
                          onSelect={(currentValue) => {
                            setSelectedProvider(
                              currentValue === selectedProvider
                                ? ""
                                : currentValue,
                            );
                            setOpen(false);
                          }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <provider.icon className="text-muted-foreground size-4" />
                            {provider.label}
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {provider.category}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <AnimatePresence>
            {selectedProvider === "unknown" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <Input
                  placeholder="Provider name..."
                  value={customProvider}
                  onChange={(e) => setCustomProvider(e.target.value)}
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <Textarea
              placeholder="Describe the element you'd like to see..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[80px] resize-none"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!selectedProvider || !description.trim()}
            size="sm"
          >
            Submit Suggestion
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
