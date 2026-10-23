import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';
import { safeStorage } from '../utils/storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Buster Error Boundary Caught Error]:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetAndReload = () => {
    safeStorage.clearAll();
    window.location.href = window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-neutral-900 border-3 border-[#FF3366] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_#FFCC00] text-center">
            
            <div className="w-16 h-16 bg-[#FF3366]/20 border-2 border-[#FF3366] rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF3366]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="font-marker text-2xl text-[#FFCC00] mb-2">
              Ruff! Something Went Wrong
            </h1>

            <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
              Buster ran into an unexpected snag while loading the page. Don't worry, your data can be restored with a single click.
            </p>

            {this.state.error && (
              <div className="bg-black/60 border border-neutral-800 rounded-lg p-3 mb-6 text-left overflow-x-auto">
                <p className="text-xs font-mono text-rose-400 font-bold mb-1">
                  Error Details:
                </p>
                <p className="text-[11px] font-mono text-neutral-400 break-words">
                  {this.state.error.message || String(this.state.error)}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full py-3 bg-[#00FFFF] hover:bg-[#33ffff] text-neutral-950 font-marker text-sm rounded-lg border-2 border-black shadow-[3px_3px_0px_#fff] flex items-center justify-center gap-2 transition-transform active:translate-y-0.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RELOAD PAGE</span>
              </button>

              <button
                onClick={this.handleResetAndReload}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs rounded-lg border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
                title="Clears local cache and loads default catalog"
              >
                <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset Local Cache & Reload</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
