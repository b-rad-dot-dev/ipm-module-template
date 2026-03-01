/**
 * Core Module Contract
 * Every module must default export a class implementing Module.
 */

export interface ModuleConfig {
    [key: string]: unknown;
}

/**
 * Lifecycle API provided by the dashboard runtime
 */
export interface ModuleContext {
    /**
     * Root wrapper element owned by the dashboard.
     * Module must attach Shadow DOM to this element.
     */
    wrapper: HTMLElement;

    /**
     * Configuration object defined in config.json
     */
    config: ModuleConfig;

    /**
     * Optional event bus (future expansion)
     */
    eventBus?: {
        emit(event: string, payload?: unknown): void;
        on(event: string, handler: (payload: unknown) => void): void;
        off(event: string, handler: Function): void;
    };

    /**
     * Optional persistent storage namespace
     */
    storage?: {
        get(key: string): Promise<unknown>;
        set(key: string, value: unknown): Promise<void>;
    };

    /**
     * Logger utility
     */
    logger?: {
        log(...args: unknown[]): void;
        warn(...args: unknown[]): void;
        error(...args: unknown[]): void;
    };
}

/**
 * Required module implementation contract
 */
export interface Module {
    /**
     * Called immediately when module is loaded.
     */
    new (wrapper: HTMLElement, config: ModuleConfig): ModuleInstance;
}

/**
 * Instance returned by module constructor
 */
export interface ModuleInstance {
    /**
     * Optional cleanup lifecycle method.
     * Called when module is removed or dashboard reloads.
     */
    destroy?(): void;

    /**
     * Optional resize hook.
     * Called when grid cell size changes.
     */
    resize?(width: number, height: number): void;

    /**
     * Optional focus lifecycle.
     */
    focus?(): void;

    /**
     * Optional blur lifecycle.
     */
    blur?(): void;
}