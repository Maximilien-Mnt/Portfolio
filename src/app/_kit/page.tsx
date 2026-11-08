import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Plate } from "@/components/ui/Plate";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { Tooltip } from "@/components/ui/Tooltip";

export default function KitPage() {
  return (
    <main className="grid grid-cols-1 gap-16 p-8 md:grid-cols-2">
      <section>
        <h2 className="text-fg font-display text-2xl mb-6">Light — Paper</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input placeholder="name@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Message</Label>
            <Textarea placeholder="Type here…" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>View mode</Label>
            <Toggle
              options={[
                { value: "grid", label: "Grid" },
                { value: "ledger", label: "Ledger" },
                { value: "map", label: "Map" },
              ]}
              defaultValue="grid"
              ariaLabel="View mode"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary">Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Tag>Default</Tag>
            <Tag track="azure">Maths</Tag>
            <Tag track="gold">Markets</Tag>
            <Tag track="moss">Endurance</Tag>
            <Tag track="signal">Signal</Tag>
          </div>
          <Plate coordinate="§00 · (x 0.00, y 0.00)">
            <p className="text-fg">Empty plate with registration marks.</p>
          </Plate>
          <div className="inline-block">
            <Tooltip content="This is a tooltip" side="top">
              <Button variant="ghost">Hover me</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      <section className="dark">
        <h2 className="text-fg font-display text-2xl mb-6">Dark — Blueprint</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input placeholder="name@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Message</Label>
            <Textarea placeholder="Type here…" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>View mode</Label>
            <Toggle
              options={[
                { value: "grid", label: "Grid" },
                { value: "ledger", label: "Ledger" },
                { value: "map", label: "Map" },
              ]}
              defaultValue="ledger"
              ariaLabel="View mode"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary">Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Tag>Default</Tag>
            <Tag track="azure">Maths</Tag>
            <Tag track="gold">Markets</Tag>
            <Tag track="moss">Endurance</Tag>
            <Tag track="signal">Signal</Tag>
          </div>
          <Plate coordinate="§00 · (x 0.00, y 0.00)">
            <p className="text-fg">Empty plate with registration marks.</p>
          </Plate>
          <div className="inline-block">
            <Tooltip content="This is a tooltip" side="top">
              <Button variant="ghost">Hover me</Button>
            </Tooltip>
          </div>
        </div>
      </section>
    </main>
  );
}