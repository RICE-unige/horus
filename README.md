<p align="center">
  <img src="imgs/horus_logo_black.svg#gh-light-mode-only" alt="HORUS logo" height="90">
  <img src="imgs/horus_logo_white.svg#gh-dark-mode-only" alt="HORUS logo" height="90">
</p>

<p align="center"><em>Holistic Operational Reality for Unified Systems</em></p>

[![License](https://img.shields.io/badge/License-Apache--2.0-green.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-Meta%20Quest%203-brightgreen)
![Focus](https://img.shields.io/badge/Focus-Research%20Release%20Channel-blue)

**Project website:** https://rice-unige.github.io/horus/

**HORUS updates:** https://www.youtube.com/@horus-mr

> This repository is the research-facing release channel for HORUS.
> It packages the project narrative, release-facing documentation, and website assets while active implementation evolves across the source repositories.

## Overview

HORUS (Holistic Operational Reality for Unified Systems) is a mixed-reality interface for managing heterogeneous mobile robot teams and teleoperating individual members of the team. The current platform targets Meta Quest 3 and is designed around a workspace-centered operational workflow for real-world robot management, not only lab visualization.

This repository is intentionally documentation- and research-oriented:
- release channel for the HORUS application,
- project website assets and top-level narrative,
- high-level onboarding for researchers, reviewers, and collaborators.

## Repository Role in the HORUS Stack

The active implementation is split across three source repositories:
- `horus` - Meta Quest MR runtime (Unity application)
- `horus_sdk` - SDK, registration payloads, examples, and dashboard tooling
- `horus_ros2` - ROS 2 bridge/runtime infrastructure (TCP/WebRTC)

This repository (`horus_research`) complements them by presenting the release-facing view of the project and research direction.

## Platform Capabilities

The development stack includes the capabilities below. A published APK may support an earlier subset; use its release notes and matching SDK/bridge versions. See the [SDK implementation status](https://rice-unige.github.io/horus_sdk/docs/reference/implementation-status) for component boundaries.

- Workspace-gated robot registration and activation in MR.
- Shared and private multi-operator workspaces with per-robot control leases.
- Articulated robot models driven by TF, with mesh colours and materials.
- Multi-robot camera visualization and teleoperation flows.
- Teleoperation modes including minimap and immersive camera-assisted operation.
- 2D tasking baseline:
  - Go-to-point
  - Waypoint authoring/execution
  - Label Pose authoring
  - Go-to-labeled navigation flow integration
- Sensor and map visualization baseline:
  - Camera
  - LaserScan
  - PointCloud
  - Occupancy map (global visualization path)
  - Native 3D triangle meshes, including incremental mapping and retained-map replay
  - Full-grid costmaps; SDK normalization of raw Nav2 costs and incremental updates
- DataViz control foundation in Robot Manager for supported channels (with explicit start/stop and unsubscribe behavior).
- Stereo camera pipeline support for immersive teleoperation (with minimap kept mono by design).
- WebRTC runtime/bridge recovery hardening for more reliable teleop streaming.

### Experimental and Optional Paths

- Native Gaussian splatting requires tracked-headset stereo and sustained-load qualification.
- Remote GPU rendering currently serves static scenes to one active viewer per agent. Live map ingestion and independent multi-view rendering are not yet available.
- HORUS Teach provides configurable humanoid embodiment, engagement/hold controls and native episode recording. A synthetic demonstration is available; physical robot adapters require their own qualification. Recorded data can be reviewed with the user's chosen tools.
- C++ and Rust SDKs provide payload/model APIs; live registration and dashboard parity with Python are not complete.

Performance depends on sensor rates, geometry, visible content, robot/operator count, network and hardware. HORUS does not claim an unlimited map size or a certified emergency-stop function.

## Research Direction and Future Goals

HORUS is being developed as a research platform for scalable mixed-reality robot operations. The next major lines of work include:

- Broader multi-operator scaling and sustained-load qualification
- AI copilot assistance for supervision and mission support
- Expanded tasking workflows (multi-robot coordinated tasking, richer semantic actions)
- Live remote mapping and independent multi-view GPU rendering
- Persistent mission objects (labels, pins, evidence, operator annotations)
- Session recording and after-action replay
- Fleet-wide admission and prioritization beyond the existing bounded transport queues
- Semantic perception overlays and risk-aware operator guidance
- Manipulator and mobile-manipulator operational workflows

The emphasis is on experimentally grounded design decisions that can be validated in realistic multi-robot scenarios.

## System Architecture (High Level)

```text
horus_sdk (registration + orchestration + dashboard)
        <->
horus_ros2 / horus_unity_bridge (ROS2 TCP/WebRTC bridge)
        <->
HORUS MR App (Meta Quest runtime, Unity)
```

## Releases and Installation

For application releases, use the APK packages published in the Releases section of this repository:
- https://github.com/RICE-unige/horus/releases
- Choose a release using its compatibility notes; development features described above are not a claim that an older APK includes them.

Typical deployment flow:
1. Install the HORUS APK on Meta Quest 3.
2. Set up the backend stack (`horus_sdk` + `horus_ros2`) on the operator laptop.
3. Connect headset and backend on the same reachable network.
4. Launch an SDK registration example (supported examples start the bridge automatically), connect the app, and create the workspace in MR.

For backend/source setup, follow the source repositories:
- SDK + installer: https://github.com/RICE-unige/horus_sdk
- ROS 2 bridge runtime: https://github.com/RICE-unige/horus_ros2

## Practical Validation Workflows (Current)

The current recommended validation path uses the SDK fake runtime and registration demos:

- Unified fake runtime (TF + camera + teleop + tasks, no occupancy in all-in-one ops test)
- Typical SDK registration demo for multi-robot workflows
- Stereo camera demo pair for immersive teleop validation (SBS or dual-topic)

These workflows are documented in detail in `horus_sdk/README.md` and tracked against the current runtime behavior in `horus/README.md`.

## Roadmap Framing

HORUS development follows a staged research roadmap:
- establish a robust MR supervision and teleoperation baseline,
- expand heterogeneous tasking and data visualization depth,
- extend multi-operator operations and qualify copilot-assisted workflows,
- validate through structured experiments and publish reproducible findings.

## Citation

If you use HORUS or ideas from this work in your research, please cite the relevant paper:

O. S. Adekoya, S. D'Angelo, F. Pagano, V. Lippiello, A. Sgorbissa, and C. T. Recchiuto. *HORUS: Architecture and Performance Characterization of an Open-Source Mixed-Reality Platform for Heterogeneous Multi-Robot Operations*. Accepted at I-RIM 3D 2026, SPAR Papers track; to appear in Springer Proceedings in Advanced Robotics.

```bibtex
@inproceedings{adekoya2026horusarchitecture,
  title     = {HORUS: Architecture and Performance Characterization of an Open-Source Mixed-Reality Platform for Heterogeneous Multi-Robot Operations},
  author    = {Adekoya, Omotoye Shamsudeen and D'Angelo, Simone and Pagano, Francesca and Lippiello, Vincenzo and Sgorbissa, Antonio and Recchiuto, Carmine Tommaso},
  booktitle = {I-RIM 3D 2026, SPAR Papers Track},
  year      = {2026},
  note      = {Accepted; to appear in Springer Proceedings in Advanced Robotics}
}
```

O. S. Adekoya, A. Sgorbissa, and C. T. Recchiuto. *A Multi-Operator Mixed-Reality Interface for Multi-Robot Control and Coordination: Co-Located and Private Workspace Collaboration*. arXiv preprint arXiv:2606.07013, 2026; accepted to IEEE RO-MAN 2026.

```bibtex
@misc{adekoya2026multioperator,
  title  = {A Multi-Operator Mixed-Reality Interface for Multi-Robot Control and Coordination: Co-Located and Private Workspace Collaboration},
  author = {Adekoya, Omotoye Shamsudeen and Sgorbissa, Antonio and Recchiuto, Carmine Tommaso},
  year   = {2026},
  eprint = {2606.07013},
  archivePrefix = {arXiv},
  primaryClass  = {cs.RO},
  url    = {https://arxiv.org/abs/2606.07013},
  note   = {arXiv preprint arXiv:2606.07013; accepted to IEEE RO-MAN 2026}
}
```

O. S. Adekoya, A. Sgorbissa, and C. T. Recchiuto. *HORUS: A Mixed Reality Interface for Managing Teams of Mobile Robots*. arXiv preprint arXiv:2506.02622, 2025; accepted to IEEE UR 2026.

```bibtex
@misc{adekoya2025horus,
  title         = {HORUS: A Mixed Reality Interface for Managing Teams of Mobile Robots},
  author        = {Adekoya, Omotoye Shamsudeen and Sgorbissa, Antonio and Recchiuto, Carmine Tommaso},
  year          = {2025},
  eprint        = {2506.02622},
  archivePrefix = {arXiv},
  primaryClass  = {cs.RO},
  url           = {https://arxiv.org/abs/2506.02622},
  note          = {arXiv preprint arXiv:2506.02622; accepted to IEEE UR 2026}
}
```

## Contact

- Omotoye Shamsudeen Adekoya
- Email: `omotoye.adekoya@edu.unige.it`

## Acknowledgments

This project is part of a PhD research effort at the University of Genoa, under the supervision of:
- Prof. Carmine Recchiuto
- Prof. Antonio Sgorbissa

Developed at [RICE Lab](https://rice.dibris.unige.it/), [University of Genoa](https://unige.it/en).

## Contributing

Local website checks need Python 3.10 or later and Node.js:

```bash
python3 tools/check_site.py
python3 -m unittest discover -s tools -p 'test_*.py'
node --check static/js/index.js
```

Open `index.html` locally, or preview GitHub Pages paths with
`python3 -m http.server 8080`. Publication pages share keyboard-accessible mobile
navigation and copyable BibTeX controls. Update publication metadata only from
the accepted manuscript or an authoritative record.

See [`CONTRIBUTING.md`](CONTRIBUTING.md). For research-facing updates, prioritize:
- clear scope and motivation,
- reproducible validation steps,
- explicit relation to current platform baseline or roadmap goals.

## License

Apache-2.0. See [`LICENSE`](LICENSE).
