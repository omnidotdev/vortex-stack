import type { PublishResponse, VortexEvent, VortexEventsConfig } from "./types";

const DEFAULT_TIMEOUT = 5000;

/** Thin HTTP client for publishing events to Vortex */
class VortexEvents {
  #config: VortexEventsConfig;

  constructor(config: VortexEventsConfig) {
    this.#config = config;
  }

  /** Publish a single event to Vortex */
  async publish(event: VortexEvent): Promise<PublishResponse> {
    const url = `${this.#config.endpoint}/api/v1/events`;
    const timeout = this.#config.timeout ?? DEFAULT_TIMEOUT;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#config.serviceKey}`,
      },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(timeout),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Vortex event publish failed (${response.status}): ${body}`,
      );
    }

    return response.json() as Promise<PublishResponse>;
  }

  /** Publish multiple events concurrently */
  async publishBatch(events: VortexEvent[]): Promise<PublishResponse[]> {
    return Promise.all(events.map((e) => this.publish(e)));
  }
}

export default VortexEvents;
