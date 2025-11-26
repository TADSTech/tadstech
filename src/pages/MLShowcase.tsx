import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Database, Activity, Zap, Layers, BarChart3, Globe } from 'lucide-react';

export const MLShowcase: React.FC = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [activeNode, setActiveNode] = useState<number>(-1);
    const [systemStatus, setSystemStatus] = useState('IDLE');
    const logEndRef = useRef<HTMLDivElement>(null);

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const runSimulation = () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setLogs([]);
        setSystemStatus('PROCESSING');
        setActiveNode(0);

        const steps = [
            { time: 500, node: 0, msg: "Initializing data ingestion pipeline..." },
            { time: 1000, node: 0, msg: "Connected to raw data source (S3 Bucket)." },
            { time: 1500, node: 0, msg: "Streaming batch: 10,000 records..." },
            { time: 2000, node: 1, msg: "Preprocessing: Cleaning null values..." },
            { time: 2500, node: 1, msg: "Preprocessing: Normalizing numerical features..." },
            { time: 3000, node: 1, msg: "Feature Engineering: Generating rolling averages..." },
            { time: 3500, node: 2, msg: "Model Inference: Loading weights (v2.4.1)..." },
            { time: 4000, node: 2, msg: "Running forward pass on GPU Cluster..." },
            { time: 4500, node: 3, msg: "Post-processing: Aggregating confidence scores..." },
            { time: 5000, node: 3, msg: "Result: High Probability (98.4%) detected." },
            { time: 5500, node: 4, msg: "API Response sent. Latency: 42ms." }
        ];

        steps.forEach(({ time, node, msg }) => {
            setTimeout(() => {
                setActiveNode(node);
                addLog(msg);
            }, time);
        });

        setTimeout(() => {
            setIsProcessing(false);
            setSystemStatus('COMPLETED');
            setActiveNode(-1);
            addLog("Pipeline execution finished successfully.");
        }, 6000);
    };

    const nodes = [
        { id: 0, label: 'Ingestion', icon: Database, color: 'text-blue-400', border: 'border-blue-500' },
        { id: 1, label: 'Processing', icon: Layers, color: 'text-yellow-400', border: 'border-yellow-500' },
        { id: 2, label: 'Inference', icon: Cpu, color: 'text-purple-400', border: 'border-purple-500' },
        { id: 3, label: 'Analysis', icon: BarChart3, color: 'text-green-400', border: 'border-green-500' },
        { id: 4, label: 'Deployment', icon: Globe, color: 'text-red-400', border: 'border-red-500' },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-mono p-6 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 border-b border-neutral-800 pb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-neutral-900 rounded-full transition-colors"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                                <Cpu className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                                ML_PIPELINE<span className="text-neutral-500">.visualize()</span>
                            </h1>
                            <p className="text-xs md:text-sm text-neutral-400">End-to-End Machine Learning Architecture Demo</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded border border-neutral-800">
                            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-green-500 animate-pulse' : 'bg-neutral-500'}`}></div>
                            <span className="text-xs">{systemStatus}</span>
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Visualization Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 relative min-h-[600px] md:min-h-[400px] flex items-center justify-center">
                            {/* Connecting Lines */}
                            <div className="absolute md:top-1/2 md:left-0 md:w-full md:h-1 md:-translate-y-1/2 top-0 left-1/2 w-1 h-full -translate-x-1/2 bg-neutral-800 z-0"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row justify-between w-full h-full gap-8 md:gap-0">
                                {nodes.map((node, index) => (
                                    <div key={node.id} className="flex md:flex-col flex-row items-center gap-4 relative group bg-black/50 md:bg-transparent p-2 md:p-0 rounded-xl md:rounded-none border border-neutral-800 md:border-none z-10">
                                        <div 
                                            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-black border-2 flex items-center justify-center transition-all duration-500 ${
                                                activeNode === index 
                                                    ? `${node.border} shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-110` 
                                                    : 'border-neutral-700 text-neutral-600'
                                            }`}
                                        >
                                            <node.icon className={`h-6 w-6 md:h-8 md:w-8 ${activeNode === index ? node.color : 'text-neutral-600'}`} />
                                        </div>
                                        <div className={`text-xs font-bold tracking-wider transition-colors duration-300 ${activeNode === index ? 'text-white' : 'text-neutral-600'}`}>
                                            {node.label}
                                        </div>
                                        
                                        {/* Active Pulse Ring */}
                                        {activeNode === index && (
                                            <div className={`absolute top-2 left-2 md:top-0 md:left-0 w-12 h-12 md:w-16 md:h-16 rounded-xl border-2 ${node.border} animate-ping opacity-50`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Data Packets Animation */}
                            {isProcessing && (
                                <>
                                    <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
                                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-[moveRight_6s_linear_infinite]"></div>
                                    </div>
                                    <div className="md:hidden absolute top-0 left-1/2 h-full -translate-x-1/2 pointer-events-none">
                                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-[moveDown_6s_linear_infinite]"></div>
                                    </div>
                                </>
                            )}
                            <style>{`
                                @keyframes moveRight {
                                    0% { left: 5%; opacity: 0; }
                                    10% { opacity: 1; }
                                    90% { opacity: 1; }
                                    100% { left: 95%; opacity: 0; }
                                }
                                @keyframes moveDown {
                                    0% { top: 5%; opacity: 0; }
                                    10% { opacity: 1; }
                                    90% { opacity: 1; }
                                    100% { top: 95%; opacity: 0; }
                                }
                            `}</style>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-neutral-900/30 border border-neutral-800 p-4 rounded-lg">
                                <div className="text-neutral-500 text-xs mb-1">Throughput</div>
                                <div className="text-xl font-bold text-white">12.5k <span className="text-xs text-neutral-500 font-normal">req/s</span></div>
                            </div>
                            <div className="bg-neutral-900/30 border border-neutral-800 p-4 rounded-lg">
                                <div className="text-neutral-500 text-xs mb-1">Avg Latency</div>
                                <div className="text-xl font-bold text-white">42 <span className="text-xs text-neutral-500 font-normal">ms</span></div>
                            </div>
                            <div className="bg-neutral-900/30 border border-neutral-800 p-4 rounded-lg">
                                <div className="text-neutral-500 text-xs mb-1">Error Rate</div>
                                <div className="text-xl font-bold text-green-400">0.02%</div>
                            </div>
                        </div>
                    </div>

                    {/* Control Panel & Logs */}
                    <div className="space-y-6">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">System Controls</h3>
                            <button
                                onClick={runSimulation}
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                                    isProcessing 
                                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                                        : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg hover:shadow-cyan-500/20'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Activity className="h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-4 w-4" />
                                        Initialize Pipeline
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-black border border-neutral-800 rounded-xl p-4 h-[400px] flex flex-col font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                                <span className="text-neutral-400">SYSTEM_LOGS</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                                {logs.length === 0 && (
                                    <div className="text-neutral-600 italic">Waiting for initialization...</div>
                                )}
                                {logs.map((log, i) => (
                                    <div key={i} className="text-green-400/80 border-l-2 border-green-900 pl-2">
                                        {log}
                                    </div>
                                ))}
                                <div ref={logEndRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
