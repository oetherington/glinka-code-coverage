var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expect = std.testing.expect;"},
{"lineNum":"   20","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   21","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   22","line":"const Config = @import(\"../../common/config.zig\").Config;"},
{"lineNum":"   23","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   24","line":"const NopBackend = @import(\"../compiler_test_case.zig\").NopBackend;"},
{"lineNum":"   25","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   26","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   27","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   28","line":"const NodeType = node.NodeType;"},
{"lineNum":"   29","line":"const makeNode = node.makeNode;"},
{"lineNum":"   30","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   31","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   32","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   33","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   34","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"pub const InferTestCase = struct {"},
{"lineNum":"   37","line":"    expectedTy: ?Type.Type = null,"},
{"lineNum":"   38","line":"    check: ?fn ("},
{"lineNum":"   39","line":"        scope: *Scope,"},
{"lineNum":"   40","line":"        typebook: *TypeBook,"},
{"lineNum":"   41","line":"        res: InferResult,"},
{"lineNum":"   42","line":"    ) anyerror!void = null,"},
{"lineNum":"   43","line":"    setup: ?fn ("},
{"lineNum":"   44","line":"        scope: *Scope,"},
{"lineNum":"   45","line":"        typebook: *TypeBook,"},
{"lineNum":"   46","line":"    ) anyerror!void = null,"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    pub fn expectSuccess(res: InferResult) !void {","class":"lineCov","hits":"2","order":"7073","possible_hits":"2",},
{"lineNum":"   49","line":"        if (res.getType() != .Success)","class":"linePartCov","hits":"1","order":"7074","possible_hits":"2",},
{"lineNum":"   50","line":"            try res.Error.report(std.io.getStdErr().writer());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":"        try expectEqual(InferResult.Success, res.getType());","class":"lineCov","hits":"1","order":"7075","possible_hits":"1",},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    pub fn run(","class":"lineCov","hits":"21","order":"6820","possible_hits":"21",},
{"lineNum":"   55","line":"        self: InferTestCase,"},
{"lineNum":"   56","line":"        comptime nodeType: NodeType,"},
{"lineNum":"   57","line":"        nodeData: anytype,"},
{"lineNum":"   58","line":"    ) !void {","class":"lineCov","hits":"42","order":"6837","possible_hits":"42",},
{"lineNum":"   59","line":"        const config = Config{};"},
{"lineNum":"   60","line":"        var backend = NopBackend.new();","class":"lineCov","hits":"21","order":"6821","possible_hits":"21",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        var compiler = Compiler.new(","class":"lineCov","hits":"21","order":"6823","possible_hits":"21",},
{"lineNum":"   63","line":"            std.testing.allocator,"},
{"lineNum":"   64","line":"            &config,"},
{"lineNum":"   65","line":"            &backend.backend,","class":"lineCov","hits":"21","order":"6822","possible_hits":"21",},
{"lineNum":"   66","line":"        );"},
{"lineNum":"   67","line":"        defer compiler.deinit();","class":"linePartCov","hits":"21","order":"6839","possible_hits":"168",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        if (self.setup) |setup|","class":"linePartCov","hits":"29","order":"6824","possible_hits":"42",},
{"lineNum":"   70","line":"            try setup(compiler.scope, compiler.typebook);","class":"linePartCov","hits":"8","order":"6864","possible_hits":"42",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"        const nd = makeNode(","class":"lineCov","hits":"21","order":"6827","possible_hits":"21",},
{"lineNum":"   73","line":"            std.testing.allocator,"},
{"lineNum":"   74","line":"            Cursor.new(6, 9),","class":"lineCov","hits":"21","order":"6825","possible_hits":"21",},
{"lineNum":"   75","line":"            nodeType,"},
{"lineNum":"   76","line":"            nodeData,","class":"lineCov","hits":"17","order":"6826","possible_hits":"17",},
{"lineNum":"   77","line":"        );"},
{"lineNum":"   78","line":"        defer std.testing.allocator.destroy(nd);","class":"linePartCov","hits":"21","order":"6838","possible_hits":"147",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"        const ctx = InferContext.none(null);","class":"lineCov","hits":"21","order":"6828","possible_hits":"21",},
{"lineNum":"   81","line":"        const res = inferExprType(&compiler, nd, &ctx);","class":"lineCov","hits":"21","order":"6829","possible_hits":"21",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"        if (res.getType() != .Success and self.expectedTy != null)","class":"linePartCov","hits":"21","order":"6830","possible_hits":"42",},
{"lineNum":"   84","line":"            try res.Error.report(std.io.getStdErr().writer());","class":"lineNoCov","hits":"0","possible_hits":"63",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        if (self.expectedTy) |expectedTy| {","class":"linePartCov","hits":"36","order":"6831","possible_hits":"42",},
{"lineNum":"   87","line":"            try expectEqual(InferResult.Success, res.getType());","class":"linePartCov","hits":"15","order":"6832","possible_hits":"42",},
{"lineNum":"   88","line":"            try expectEqual(expectedTy, res.Success.getType());","class":"linePartCov","hits":"30","order":"6833","possible_hits":"63",},
{"lineNum":"   89","line":"            try expect(nd.ty != null);","class":"linePartCov","hits":"15","order":"6834","possible_hits":"42",},
{"lineNum":"   90","line":"            try expectEqual(expectedTy, nd.ty.?.getType());","class":"linePartCov","hits":"15","order":"6835","possible_hits":"63",},
{"lineNum":"   91","line":"        }"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"        if (self.check) |check|","class":"linePartCov","hits":"30","order":"6836","possible_hits":"42",},
{"lineNum":"   94","line":"            try check(compiler.scope, compiler.typebook, res);","class":"linePartCov","hits":"9","order":"6898","possible_hits":"42",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:43:06", "instrumented" : 27, "covered" : 25,};
var merged_data = [];
