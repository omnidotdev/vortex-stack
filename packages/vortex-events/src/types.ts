/** Event to publish to Vortex */
type VortexEvent = {
  /** Dot-notation event type (e.g. "task.completed") */
  type: string;
  /** Entity ID for ordering */
  subject?: string;
  /** Event payload */
  data: Record<string, unknown>;
  /** Source identifier (defaults to SDK config) */
  source?: string;
  /** Request correlation ID */
  correlationId?: string;
};

/** SDK configuration */
type VortexEventsConfig = {
  /** Vortex API endpoint (e.g. "https://api.vortex.omni.dev") */
  endpoint: string;
  /** Service API key for authentication */
  serviceKey: string;
  /** Request timeout in ms (default: 5000) */
  timeout?: number;
};

/** Response from publishing an event */
type PublishResponse = {
  eventId: string;
  timestamp: string;
};

export type { PublishResponse, VortexEvent, VortexEventsConfig };
