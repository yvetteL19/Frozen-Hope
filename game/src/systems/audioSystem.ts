// 音频系统 - 管理游戏音效和背景音乐

type SoundType =
  | 'click'           // 按钮点击
  | 'choice_select'   // 选择确认
  | 'choice_hover'    // 选项悬停
  | 'stress_tick'     // 压力增加
  | 'stress_warning'  // 压力警告（高压力时）
  | 'stress_critical' // 压力危急
  | 'hp_loss'         // HP损失
  | 'hp_gain'         // HP恢复
  | 'perfect'         // 完美决策
  | 'trap'            // 陷入陷阱
  | 'death'           // NPC死亡
  | 'beacon_progress' // 信标进度增加
  | 'event_start'     // 新事件开始
  | 'ending';         // 结局触发

type MusicType =
  | 'ambient'         // 基础环境音
  | 'tension'         // 紧张氛围
  | 'danger'          // 危险时刻
  | 'hope';           // 希望/救援

interface AudioSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  muted: boolean;
}

// 使用 Web Audio API 生成程序化音效
class AudioSystem {
  private audioContext: AudioContext | null = null;
  private settings: AudioSettings = {
    masterVolume: 0.7,
    sfxVolume: 0.8,
    musicVolume: 0.5,
    muted: false,
  };

  private currentMusic: {
    source: AudioBufferSourceNode | null;
    gainNode: GainNode | null;
    type: MusicType | null;
  } = { source: null, gainNode: null, type: null };

  private initialized = false;

  // 初始化音频上下文（需要用户交互后调用）
  init(): void {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.loadSettings();
      this.initialized = true;
      console.log('Audio system initialized');
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  // 确保音频上下文已启动
  private ensureContext(): AudioContext | null {
    if (!this.audioContext) {
      this.init();
    }
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  // 播放音效
  playSound(type: SoundType): void {
    if (this.settings.muted) return;

    const ctx = this.ensureContext();
    if (!ctx) return;

    const volume = this.settings.masterVolume * this.settings.sfxVolume;

    switch (type) {
      case 'click':
        this.playTone(ctx, 800, 0.05, volume * 0.3, 'sine');
        break;
      case 'choice_hover':
        this.playTone(ctx, 600, 0.03, volume * 0.15, 'sine');
        break;
      case 'choice_select':
        this.playTone(ctx, 440, 0.1, volume * 0.4, 'sine');
        setTimeout(() => this.playTone(ctx, 550, 0.1, volume * 0.3, 'sine'), 50);
        break;
      case 'stress_tick':
        this.playTone(ctx, 200, 0.15, volume * 0.5, 'triangle');
        break;
      case 'stress_warning':
        this.playTone(ctx, 150, 0.3, volume * 0.6, 'sawtooth');
        setTimeout(() => this.playTone(ctx, 120, 0.3, volume * 0.5, 'sawtooth'), 200);
        break;
      case 'stress_critical':
        this.playHeartbeat(ctx, volume * 0.7);
        break;
      case 'hp_loss':
        this.playTone(ctx, 300, 0.15, volume * 0.4, 'sawtooth');
        setTimeout(() => this.playTone(ctx, 200, 0.2, volume * 0.3, 'sawtooth'), 100);
        break;
      case 'hp_gain':
        this.playTone(ctx, 523, 0.1, volume * 0.3, 'sine');
        setTimeout(() => this.playTone(ctx, 659, 0.1, volume * 0.3, 'sine'), 80);
        setTimeout(() => this.playTone(ctx, 784, 0.15, volume * 0.4, 'sine'), 160);
        break;
      case 'perfect':
        this.playChime(ctx, volume * 0.5);
        break;
      case 'trap':
        this.playTone(ctx, 200, 0.3, volume * 0.5, 'sawtooth');
        setTimeout(() => this.playTone(ctx, 150, 0.4, volume * 0.4, 'sawtooth'), 150);
        break;
      case 'death':
        this.playDeathSound(ctx, volume * 0.6);
        break;
      case 'beacon_progress':
        this.playTone(ctx, 880, 0.1, volume * 0.3, 'sine');
        setTimeout(() => this.playTone(ctx, 1100, 0.15, volume * 0.4, 'sine'), 100);
        break;
      case 'event_start':
        this.playTone(ctx, 330, 0.2, volume * 0.3, 'sine');
        break;
      case 'ending':
        this.playEndingSound(ctx, volume * 0.5);
        break;
    }
  }

  // 基础音调生成
  private playTone(
    ctx: AudioContext,
    frequency: number,
    duration: number,
    volume: number,
    type: OscillatorType
  ): void {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.1);
  }

  // 心跳音效（危急状态）
  private playHeartbeat(ctx: AudioContext, volume: number): void {
    // 第一声
    this.playTone(ctx, 60, 0.15, volume, 'sine');
    setTimeout(() => this.playTone(ctx, 50, 0.1, volume * 0.7, 'sine'), 100);
    // 第二声
    setTimeout(() => {
      this.playTone(ctx, 60, 0.15, volume, 'sine');
      setTimeout(() => this.playTone(ctx, 50, 0.1, volume * 0.7, 'sine'), 100);
    }, 300);
  }

  // 完美决策音效
  private playChime(ctx: AudioContext, volume: number): void {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(ctx, freq, 0.3 - i * 0.05, volume * (1 - i * 0.15), 'sine');
      }, i * 100);
    });
  }

  // 死亡音效
  private playDeathSound(ctx: AudioContext, volume: number): void {
    const notes = [400, 350, 300, 250, 200];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(ctx, freq, 0.3, volume * (1 - i * 0.15), 'triangle');
      }, i * 150);
    });
  }

  // 结局音效
  private playEndingSound(ctx: AudioContext, volume: number): void {
    this.playTone(ctx, 220, 0.5, volume, 'sine');
    setTimeout(() => this.playTone(ctx, 330, 0.5, volume, 'sine'), 300);
    setTimeout(() => this.playTone(ctx, 440, 0.8, volume * 1.2, 'sine'), 600);
  }

  // 播放/切换背景音乐
  playMusic(type: MusicType): void {
    if (this.settings.muted) return;

    const ctx = this.ensureContext();
    if (!ctx) return;

    // 如果已经在播放相同音乐，不重复
    if (this.currentMusic.type === type && this.currentMusic.source) {
      return;
    }

    // 停止当前音乐
    this.stopMusic();

    // 创建低频环境噪音
    const bufferSize = ctx.sampleRate * 10; // 10秒循环
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // 根据类型生成不同的环境音
    switch (type) {
      case 'ambient':
        this.generateWindNoise(data, bufferSize, 0.3);
        break;
      case 'tension':
        this.generateWindNoise(data, bufferSize, 0.5);
        this.addLowDrone(data, bufferSize, ctx.sampleRate, 0.2);
        break;
      case 'danger':
        this.generateWindNoise(data, bufferSize, 0.7);
        this.addLowDrone(data, bufferSize, ctx.sampleRate, 0.4);
        break;
      case 'hope':
        this.generateWindNoise(data, bufferSize, 0.2);
        this.addHighTone(data, bufferSize, ctx.sampleRate, 0.15);
        break;
    }

    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();

    source.buffer = buffer;
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    const volume = this.settings.masterVolume * this.settings.musicVolume;
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 2);

    source.start();

    this.currentMusic = { source, gainNode, type };
  }

  // 生成风声噪音
  private generateWindNoise(data: Float32Array, length: number, intensity: number): void {
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * intensity * 0.1;
    }
    // 低通滤波模拟
    for (let i = 1; i < length; i++) {
      data[i] = data[i] * 0.1 + data[i - 1] * 0.9;
    }
  }

  // 添加低频无人机音
  private addLowDrone(data: Float32Array, length: number, sampleRate: number, intensity: number): void {
    const freq = 55; // A1
    for (let i = 0; i < length; i++) {
      data[i] += Math.sin(2 * Math.PI * freq * i / sampleRate) * intensity * 0.05;
    }
  }

  // 添加高频希望音
  private addHighTone(data: Float32Array, length: number, sampleRate: number, intensity: number): void {
    const freq = 440; // A4
    for (let i = 0; i < length; i++) {
      const envelope = Math.sin(Math.PI * i / length); // 渐入渐出
      data[i] += Math.sin(2 * Math.PI * freq * i / sampleRate) * intensity * 0.02 * envelope;
    }
  }

  // 停止背景音乐
  stopMusic(): void {
    if (this.currentMusic.source) {
      try {
        if (this.currentMusic.gainNode && this.audioContext) {
          this.currentMusic.gainNode.gain.linearRampToValueAtTime(
            0,
            this.audioContext.currentTime + 1
          );
        }
        setTimeout(() => {
          this.currentMusic.source?.stop();
          this.currentMusic = { source: null, gainNode: null, type: null };
        }, 1000);
      } catch {
        this.currentMusic = { source: null, gainNode: null, type: null };
      }
    }
  }

  // 根据游戏状态更新背景音乐
  updateMusicForGameState(stressClock: number, phase: string): void {
    if (phase === 'ending') {
      this.stopMusic();
      return;
    }

    if (phase === 'start' || phase === 'character_select') {
      this.playMusic('ambient');
      return;
    }

    if (stressClock >= 13) {
      this.playMusic('danger');
    } else if (stressClock >= 8) {
      this.playMusic('tension');
    } else {
      this.playMusic('ambient');
    }
  }

  // 设置音量
  setMasterVolume(volume: number): void {
    this.settings.masterVolume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
    this.updateMusicVolume();
  }

  setSfxVolume(volume: number): void {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
  }

  setMusicVolume(volume: number): void {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
    this.updateMusicVolume();
  }

  private updateMusicVolume(): void {
    if (this.currentMusic.gainNode && this.audioContext) {
      const volume = this.settings.masterVolume * this.settings.musicVolume;
      this.currentMusic.gainNode.gain.linearRampToValueAtTime(
        volume * 0.3,
        this.audioContext.currentTime + 0.5
      );
    }
  }

  // 静音切换
  toggleMute(): boolean {
    this.settings.muted = !this.settings.muted;
    this.saveSettings();

    if (this.settings.muted) {
      this.stopMusic();
    }

    return this.settings.muted;
  }

  isMuted(): boolean {
    return this.settings.muted;
  }

  getSettings(): AudioSettings {
    return { ...this.settings };
  }

  // 保存设置到localStorage
  private saveSettings(): void {
    try {
      localStorage.setItem('frozen_hope_audio', JSON.stringify(this.settings));
    } catch {
      // localStorage可能不可用
    }
  }

  // 从localStorage加载设置
  private loadSettings(): void {
    try {
      const saved = localStorage.getItem('frozen_hope_audio');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.settings = { ...this.settings, ...parsed };
      }
    } catch {
      // 使用默认设置
    }
  }
}

// 单例导出
export const audioSystem = new AudioSystem();

// 便捷函数
export const playSound = (type: SoundType) => audioSystem.playSound(type);
export const playMusic = (type: MusicType) => audioSystem.playMusic(type);
export const stopMusic = () => audioSystem.stopMusic();
export const initAudio = () => audioSystem.init();
